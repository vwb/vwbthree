import { v1 as uuidv1 } from "uuid";
import { getSkuPrices, getStripeLineItems } from "../../../utils/checkout";
import { createOrder, deleteOrder } from "../../../utils/order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * interface PhotoMetaData {
 *  filename: string;
 *  height: number;
 *  size: number;
 *  width: number;
 * }
 *
 * interface itemShape {
 *  printSize: string;
 *  ratio: number;
 *  price: number;
 *  sku: string;
 * }
 *
 * interface photoShape {
 *  collections: string;
 *  displayName: number;
 *  location: number;
 *  metaData: photoMetaData;
 *  orientation: 'portrait' | 'landscape';
 *  ratio: number;
 *  photoName: string;
 *  summary: string;
 *  url: string;
 * }
 *
 * interface ParsedBody {
 *  [photoId]: {
 *      [skuId]: {
 *          count: string;
 *          item: itemShape;
 *          photo: photoShape;
 *      }
 *  }
 * }
 *
 * interface OrderItem {
 *  sku: string; //GLOBAL_PAP_10x12
 *  photoId: string; //DC12312
 *  photoUrl: string;
 *  photoName: string;
 *  itemPrintSize: string;
 * }
 *
 * {
 *  order_id: string;
 *  items: OrderItem[];
 *  total: number;
 *  user: {};
 *  status: 'received' | 'fulfillment' | 'shipped' | 'delivered' ;
 * }
 */

export default async function handler(req, res) {
    if (req.method === "POST") {
        const orderUUID = uuidv1();
        const parsedBody = JSON.parse(req.body);
        const skuPrices = await getSkuPrices(parsedBody);
        const lineItems = getStripeLineItems(parsedBody, skuPrices);

        try {
            await createOrder(orderUUID, lineItems);
        } catch (err) {
            //unable to generate order for checkout
            res.status(err.statusCode || 500).json(err.message);
            return;
        }

        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: "payment",
                billing_address_collection: "auto",
                shipping_address_collection: {
                    allowed_countries: ["US", "CA", "GB"]
                },
                success_url: `${req.headers.origin}/photos/orders/${orderUUID}`,
                cancel_url: `${req.headers.origin}/photos/cart`,
                automatic_tax: { enabled: true },
                metadata: {
                    orderId: orderUUID,
                    test: "test"
                }
            });

            res.status(200);
            res.json({ url: session.url });
        } catch (err) {
            await deleteOrder(orderUUID);
            res.status(err.statusCode || 500).json(err.message);
            return;
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).send("Method Not Allowed");
    }
}
