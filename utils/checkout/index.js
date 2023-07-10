import { db, PRODUCT_SKU_TABLE } from "../../db";
import { updateOrderStatus, getOrder } from "../order";
import { sendOrderConfirmationEmail } from "../email";
import { getRootUrl } from "../api";
import { createProdigiOrder } from "../fulfillment";

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

export function validateCheckoutSuccess(event) {
    if (!event?.data?.object?.metadata?.orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }
    if (!event?.data?.object?.shipping) {
        throw new Error("Missing shipping information");
    }
}

export async function handleCompletedCheckout(event) {
    const orderId = event?.data?.object?.metadata?.orderId;
    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };
    const order = await getOrder(orderId);

    if (order.status === "received") {
        try {
            const prodigiOrder = await createProdigiOrder(
                orderId,
                userData,
                order.items
            );
            const prodigiOrderId = prodigiOrder.order.id;

            await updateOrderStatus(orderId, "processing", {
                prodigiOrderId
            });

            try {
                await sendOrderConfirmationEmail({
                    recipient: userData.email,
                    recipientName: userData.name,
                    orderId: orderId
                });
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
