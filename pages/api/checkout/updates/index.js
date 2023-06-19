import { buffer } from "micro";
import { handleCompletedCheckout } from "../../../../utils/fulfillment";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false
    }
};

const endpointSecret =
    "whsec_9095a706cfe328363afa7388e858ed47ce84322365d46fa0349ef0c221169b2a";

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
        console.log("webhook triggered");

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
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} was successful!`
                );
                res.status(200);

                break;

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
            default:
                break;
        }

        res.json({ received: true });
    }
}
