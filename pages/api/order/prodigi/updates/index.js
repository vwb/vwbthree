import { updateOrderStatus, getOrder } from "../../../../../utils/order";
import { sendOrderShippedEmail } from "../../../../../utils/email";

const PRODIGI_STATUS_MAP = {
    Complete: { status: "shipped", emailTrigger: sendOrderShippedEmail },
    //TODO: add email template for cancelling an order
    Cancelled: { status: "cancelled" }
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const parsedBody = JSON.parse(req.body);
        const orderId = parsedBody.data?.order?.idempotencyKey;
        const prodigiStatus = parsedBody.data?.order?.status?.stage || "";
        const statusUpdate = PRODIGI_STATUS_MAP[prodigiStatus];

        try {
            if (!!statusUpdate && orderId) {
                console.log(
                    "Update prodigi order status: ",
                    statusUpdate.status
                );
                const order = await getOrder(orderId);

                if (
                    order.status !== "shipped" &&
                    statusUpdate.status === "shipped"
                ) {
                    await updateOrderStatus(orderId, statusUpdate.status);
                    await sendOrderShippedEmail({
                        recipient: order.user.email,
                        orderId: orderId
                    });
                }

                //handle cancelled order here
            }
        } catch (e) {
            console.error("Error updating order status", e.message);
        }

        res.json({ received: true });
    }
}
