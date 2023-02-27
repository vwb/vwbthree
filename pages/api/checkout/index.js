import { v1 as uuidv1 } from "uuid";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * interface OrderItem {
 *  sku: string; //GLOBAL_PAP_10x12
 *  photoId: string; //DC12312
 * }
 *
 * orderId{
 *  items: OrderItem[],
 *  total: number,
 *  user:{},
 *  status: '',
 * }
 */

const getStripeLineItems = (parsedBody, skuPrices) => {
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
                        //TODO: get this from server
                        unit_amount: item.price * 100,
                        tax_behavior: "exclusive",
                        currency: "USD",
                        product_data: {
                            name: `${photo.displayName} -- ${item.printSize}`,
                            images: [photo.url],
                            metadata: {
                                sku,
                                photoId,
                                photoName: photo.displayName,
                                itemPrintSize: item.printSize
                            }
                        }
                    }
                };
            })
        ];
    }, []);

    return lineItems;
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const orderUUID = uuidv1();
        //get information off of the post body
        //image/sku/quantities
        //get price data from DB for given SKUs
        const parsedBody = JSON.parse(req.body);

        //get SKUs in post body
        //request SKUs from DB to get a pricing data in place
        const skuPrices = await getSkuPrices(parsedBody);
        const lineItems = getStripeLineItems(parsedBody, skuPrices);

        await createOrder(orderUUID, lineItems);

        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: "payment",
                billing_address_collection: "auto",
                shipping_address_collection: {
                    allowed_countries: ["US", "CA", "GB"]
                },
                success_url: `${req.headers.origin}/photos/orders/${orderUUID}?success=true`,
                cancel_url: `${req.headers.origin}/photos/cart`,
                automatic_tax: { enabled: true },
                metadata: {
                    orderId: orderUUID
                }
            });
            res.json({ url: session.url });
            res.status(200);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);

            //delete order
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
