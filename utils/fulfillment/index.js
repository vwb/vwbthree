import { updateOrderStatus, getOrder } from "../order";
import { createSignedDownloadUrlForAsset } from "../assets";
import { sendOrderConfirmationEmail } from "../email";

export async function handleCompletedCheckout(event) {
    const orderId = event?.data?.object?.metadata?.orderId;

    if (!orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }

    if (!event?.data?.object?.shipping) {
        throw new Error("Missing shipping information");
    }

    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };

    const order = await getOrder(orderId);
    const orderData = order.items;

    if (!orderData) {
        throw new Error("Missing order information");
    }

    const prodigiOrder = await createProdigiOrder(orderId, userData, orderData);
    const prodigiOrderId = prodigiOrder.order.id;

    await updateOrderStatus(orderId, "processing", {
        user: userData,
        stripeCheckoutSessionId: event.data.object.id,
        prodigiOrderId
    });

    await sendOrderConfirmationEmail({
        recipient: userData.email,
        recipientName: userData.name,
        orderId: orderId,
        orderData: orderData
    });
}

async function createProdigiOrder(orderId, userData, orderData) {
    let formattedProducts;
    let recipient;

    try {
        formattedProducts = await constructProducts(orderData);
        recipient = constructRecipient(userData);
    } catch (e) {
        throw e;
    }

    const order = {
        recipient,
        items: formattedProducts,
        shippingMethod: "Budget",
        idempotencyKey: orderId
    };

    try {
        console.log("Creating prodigi order for: ", orderId);

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

        if (prodigiOrderRequest.status >= 400) {
            console.log("ProdigiOrderStatusCode: ", prodigiOrderRequest.status);
            throw new Error(JSON.stringify(prodigiOrderContent));
        }

        console.log(
            "Successfully created order: ",
            prodigiOrderContent.order.id
        );
        console.log(
            "Prodigi order success outcome: ",
            prodigiOrderContent.outcome
        );

        return prodigiOrderContent;
    } catch (e) {
        console.log("Error creating order with Prodigi:", e.message);
        throw e;
    }
}

/**
 * OrderItems {
 *  itemPrintSize: string
 *  photoId: string
 *  photoName: string
 *  photoUrl: string
 *  quantity: number
 *  sku: string
 * }[]
 *
 * @param {*} orderLineItems: OrderItems
 */
async function constructProducts(orderLineItems) {
    const prodigiItems = [];
    const signedUrlMap = new Map();

    for (const item of orderLineItems) {
        let signedAssetUrl;
        const quantity = item.quantity;

        if (signedUrlMap.has(item.photoId)) {
            signedAssetUrl = signedUrlMap.get(item.photoId);
        } else {
            signedAssetUrl = await createSignedDownloadUrlForAsset(
                `${item.photoId}.jpg`
            );
            signedUrlMap.set(item.photoId, signedAssetUrl);
        }

        prodigiItems.push({
            sizing: "fillPrintArea",
            copies: quantity,
            sku: item.sku,
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
function constructRecipient(userData) {
    return {
        name: userData.shipping_address.name,
        email: userData.email,
        address: {
            line1: userData.shipping_address.address.line1,
            line2: userData.shipping_address.address.line2,
            postalOrZipCode: userData.shipping_address.address.postal_code,
            countryCode: userData.shipping_address.address.country,
            townOrCity: userData.shipping_address.address.city,
            stateOrCounty: userData.shipping_address.address.state
        }
    };
}
