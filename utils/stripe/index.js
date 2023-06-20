import Stripe from "stripe";

export async function getStripeSDK() {
    const stripe = await Stripe(process.env.STRIPE_SECRET_KEY);
    return stripe;
}
