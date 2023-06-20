import { updateOrderStatus } from "../order";
import { createSignedDownloadUrlForAsset } from "../assets";
import { getStripeSDK } from "../stripe";

export async function handleCompletedCheckout(event) {
    const orderId = event?.data?.object?.metadata?.orderId;

    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };

    if (!orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }

    if (!userData.shipping_address) {
        throw new Error("Missing shipping information");
    }

    const prodigiOrder = await createProdigiOrder(event);
    const prodigiOrderId = prodigiOrder.order.id;

    console.log("updating order status");

    await updateOrderStatus(orderId, "processing", {
        user: userData,
        stripeCheckoutSessionId: event.data.object.id,
        prodigiOrderId
    });
}

async function createProdigiOrder(event) {
    const products = await getCheckoutSessionLineItems(event.data.object.id);
    const recipient = constructRecipient(event);

    const order = {
        recipient,
        items: products,
        shippingMethod: "Budget"
    };

    try {
        const prodigiOrderRequest = await fetch(
            `https://${process.env.PRODIGI_ROOT_URL}/v4.0/Orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": `${process.env.PRODIGI_API_KEY}`
                },
                body: JSON.stringify(order)
            }
        );
        const prodigiOrderContent = await prodigiOrderRequest.json();

        console.log("ProdigiOrderStatusCode: ", prodigiOrderRequest.status);

        if (prodigiOrderRequest.status >= 400) {
            throw new Error(
                `Error creating prodigi order. Status: ${prodigiOrderRequest.status}. Message: ${prodigiOrderContent}`
            );
        }

        return prodigiOrderContent;
    } catch (e) {
        console.log("Error creating order with Prodigi:", e.message);
        throw e;
    }
}

/**
 * /**
 * StripeVwbthreePhotoItem {
 *  id: string;
 *  object: string; //item
 *  amount_discount
 * }
 *
 * StripeItems {
 *  object: 'list';
 *  data: StripeVwbthreePhotoItem[];
 *  has_more: boolean;
 *  url: string;
 * }
 *
 * ProdigiItem {
 *  sku: string;
 *  copies: number;
 *  sizing: fillPrintArea | string;
 *  assets: ProdigiAsset[]
 * }
 *
 * ProdigiAsset {
 *  printArea: default | string;
 *  url: string //signed URL
 * }
 *
 * Gets the line items associated to the passed in checkout session
 *
 * @param {*} checkoutId string Checkout session ID
 */
async function getCheckoutSessionLineItems(checkoutId) {
    const signedUrlMap = {};
    const prodigiItems = [];
    const stripeSdk = await getStripeSDK();
    const lineItems = await stripeSdk.checkout.sessions.listLineItems(
        checkoutId,
        {
            limit: 50
        }
    );

    for (const item of lineItems.data) {
        let signedAssetUrl;
        const quantity = item.quantity;

        const product = await stripeSdk.products.retrieve(item.price.product);
        const photoId = product.metadata.photoId;

        if (signedUrlMap[photoId]) {
            signedAssetUrl = signedUrlMap[photoId];
        } else {
            signedAssetUrl = await createSignedDownloadUrlForAsset(
                `${product.metadata.photoId}.jpg`
            );
            signedUrlMap[photoId] = signedAssetUrl;
        }

        prodigiItems.push({
            sizing: "fillPrintArea",
            copies: quantity,
            sku: product.metadata.sku,
            assets: [
                {
                    url: signedAssetUrl,
                    printArea: "default"
                }
            ]
        });
    }

    return prodigiItems;
}

/**
 * ProdigiRecipient {
 * 
    "address": {
        "line1": "14 test place",
        "line2": "test",
        "postalOrZipCode": "12345",
        "countryCode": "US",
        "townOrCity": "somewhere",
        "stateOrCounty": "somewhereelse"
    },
    "name": "John Testman",
    "email": "jtestman@prodigi.com"
}
 * 
 * 
 * @param {*} event 
 */
function constructRecipient(event) {
    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping: event?.data?.object?.shipping
    };

    return {
        name: userData.shipping.name,
        email: userData.email,
        address: {
            line1: userData.shipping.address.line1,
            line2: userData.shipping.address.line2,
            postalOrZipCode: userData.shipping.address.postal_code,
            countryCode: userData.shipping.address.country,
            townOrCity: userData.shipping.address.city,
            stateOrCounty: userData.shipping.address.state
        }
    };
}
