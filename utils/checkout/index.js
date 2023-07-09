import { db, PRODUCT_SKU_TABLE } from "../../db";
import { updateOrderStatus } from "../order";
import { sendOrderConfirmationEmail } from "../email";

async function queryDbForSkus(skuSetArray) {
    const skuExpressionAttributeValues = skuSetArray.reduce(
        (memo, sku, index) => {
            return {
                ...memo,
                [`:sku${index}`]: sku
            };
        },
        {}
    );
    const skuExpressFilterValues = Object.keys(
        skuExpressionAttributeValues
    ).toString();

    var params = {
        TableName: PRODUCT_SKU_TABLE,
        ExpressionAttributeValues: skuExpressionAttributeValues,
        FilterExpression: `sku IN (${skuExpressFilterValues})`
    };

    try {
        const result = await db.scan(params).promise();
        const skusFromDB = result.Items;
        return skusFromDB;
    } catch (e) {
        console.error("failed");
        console.error(e);
    }

    return [];
}

/**
 *
 * @param {*} parsedBody
 */
export async function getSkuPrices(parsedBody) {
    const skuSet = Object.keys(parsedBody).reduce((set, photoId) => {
        const photoData = parsedBody[photoId];
        const skus = Object.keys(photoData);
        skus.map(sku => set.add(sku));

        return set;
    }, new Set());
    const skuSetArray = [...skuSet];
    const skusFromDB = await queryDbForSkus(skuSetArray);

    return skusFromDB.reduce((memo, skuItem) => {
        return {
            ...memo,
            [skuItem.sku]: skuItem.price
        };
    }, {});
}

export function getStripeLineItems(parsedBody, skuPrices) {
    const lineItems = Object.keys(parsedBody).reduce((memo, photoId) => {
        const itemsForPhoto = parsedBody[photoId];

        return [
            ...memo,
            ...Object.keys(itemsForPhoto).map(sku => {
                const price = skuPrices[sku];
                const item = itemsForPhoto[sku].item;
                const photo = itemsForPhoto[sku].photo;
                const quantity = itemsForPhoto[sku].count;

                return {
                    quantity,
                    price_data: {
                        unit_amount: price * 100,
                        tax_behavior: "exclusive",
                        currency: "USD",
                        product_data: {
                            name: `${photo.displayName} -- ${item.printSize}`,
                            images: [photo.url],
                            metadata: {
                                photoId: photoId,
                                sku: sku,
                                photoName: photo.displayName,
                                itemPrintSize: item.printSize,
                                photoUrl: photo.url
                            }
                        }
                    }
                };
            })
        ];
    }, []);

    return lineItems;
}

function validateCheckoutSuccess(event) {
    if (!event?.data?.object?.metadata?.orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }
    if (!event?.data?.object?.shipping) {
        throw new Error("Missing shipping information");
    }
}

function getRootUrl() {
    const path = process.env.VERCEL_URL;

    if (path.includes("localhost:3000")) {
        return `http://${path}`;
    }

    return `https://${path}`;
}

export async function handleCompletedCheckout(event) {
    validateCheckoutSuccess(event);

    const orderId = event?.data?.object?.metadata?.orderId;
    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };

    await updateOrderStatus(orderId, "received", {
        user: userData,
        stripeCheckoutSessionId: event.data.object.id
    });

    //call fullfillment endpoint.
    //Don't wait for response.
    const rootUrl = getRootUrl();
    fetch(`${rootUrl}/api/orders/fulfillment`, {
        method: "POST",
        body: JSON.stringify({
            orderId: orderId,
            userData
        })
    });

    // const prodigiOrder = await createProdigiOrder(orderId, userData, orderData);
    // const prodigiOrderId = prodigiOrder.order.id;

    // //Wrap the order confirmation email in a
    // //standalone try catch to not fail the entire order.

    try {
        await sendOrderConfirmationEmail({
            recipient: userData.email,
            recipientName: userData.name,
            orderId: orderId
        });
    } catch (e) {
        console.error(e);
    }
}
