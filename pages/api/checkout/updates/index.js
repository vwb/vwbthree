import { buffer } from "micro";
import { handleCompletedCheckout } from "../../../../utils/checkout";
import { updateOrderStatus, deleteOrder } from "../../../../utils/order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false
    }
};

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

/**
 *
 * @param {*} buf Buffered version of the original request
 * @param {*} originalRequest Original incoming request
 * @returns
 */
const verifyStripeWebhook = (buf, originalRequest) => {
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = originalRequest.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(
            buf,
            signature,
            endpointSecret
        );
        return event;
    }
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        let event;

        try {
            event = verifyStripeWebhook(buf, req);
        } catch (err) {
            console.log(
                `⚠️  Webhook signature verification failed.`,
                err.message
            );
            res.status(400);
        }

        switch (event.type) {
            case "checkout.session.completed":
                const userData = {
                    email: event?.data?.object?.customer_details?.email,
                    name: event?.data?.object?.customer_details?.name,
                    shipping_address: event?.data?.object?.shipping
                };

                await updateOrderStatus(orderId, "received", {
                    user: userData,
                    stripeCheckoutSessionId: event.data.object.id
                });

                res.status(200);
                res.json({ received: true });

                await handleCompletedCheckout(event);
                return;
            case "checkout.session.expired":
                const orderUUID = event?.data?.object?.metadata?.orderId;

                if (orderUUID) {
                    console.log(
                        "Checkout expired. Deleting created order:",
                        orderUUID
                    );
                    await deleteOrder(orderUUID);
                }

                res.status(200);
                res.json({ received: true });
                break;
            default:
                console.log("Unsupported event");
                res.status(400);
                res.json({ received: true });
                break;
        }
    }
}
