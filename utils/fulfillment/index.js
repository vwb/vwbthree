import { updateOrderStatus } from "../order";

export async function handleCompletedCheckout(event) {
    const orderId = event?.data?.object?.metadata?.orderId;

    console.log(event);

    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };

    if (!orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }

    if (!userData.shipping_address) {
        throw new Error("Missing shipping information");
    }

    //call prodigi and create order here

    //successfully generated prodigi order
    await updateOrderStatus(orderId, "processing", userData);
}
