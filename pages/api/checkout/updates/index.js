import { buffer } from "micro";
import { handleCompletedCheckout } from "../../../../utils/fulfillment";

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
            console.log("Checkout update request verified");
        } catch (err) {
            console.log(
                `⚠️  Webhook signature verification failed.`,
                err.message
            );
            res.status(400);
        }

        switch (event.type) {
            case "checkout.session.completed":
                try {
                    await handleCompletedCheckout(event);
                    res.status(200);
                } catch (e) {
                    //todo: handle cancelling payment/order thats inflight
                    console.error(
                        "Error handling checkout.session_completed event",
                        e.message
                    );
                    res.status(500);
                }

                break;

            case "checkout.session.expired":
                const orderUUID = event?.data?.object?.metadata?.orderId;

                if (orderId) {
                    console.log(
                        "Checkout expired. Deleting created order:",
                        orderUUID
                    );
                    await deleteOrder(orderUUID);
                }

                res.status(200);
                break;
            default:
                console.log("Unsupported event");
                res.status(400);
                break;
        }

        res.json({ received: true });
    }
}
