const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        //get information off of the post body
        //image/sku/quantities
        //get price data from DB for given SKUs
        const parsedBody = JSON.parse(req.body);

        const lineItems = Object.keys(parsedBody).reduce((memo, photoId) => {
            const itemsForPhoto = parsedBody[photoId];

            return [
                ...memo,
                ...Object.keys(itemsForPhoto).map(sku => {
                    const item = itemsForPhoto[sku].item;
                    const photo = itemsForPhoto[sku].photo;
                    const quantity = itemsForPhoto[sku].count;

                    console.log(photo.url);

                    return {
                        quantity,
                        price_data: {
                            //TODO: get this from server
                            unit_amount: item.price * 100,
                            tax_behavior: "exclusive",
                            currency: "USD",
                            product_data: {
                                name: `${photo.displayName} -- ${item.printSize}`,
                                images: [photo.url, photo.url]
                            }
                        }
                    };
                })
            ];
        }, []);

        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: "payment",
                billing_address_collection: "auto",
                shipping_address_collection: {
                    allowed_countries: ["US", "CA", "GB"]
                },
                //TODO: link to proper order screen. include data here
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/photos/cart`,
                automatic_tax: { enabled: true }
            });
            res.json({ url: session.url });
            res.status(200);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
