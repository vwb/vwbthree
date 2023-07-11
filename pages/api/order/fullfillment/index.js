import { updateOrderStatus, getOrder } from "../../../../utils/order";
import { createProdigiOrder } from "../../../../utils/fulfillment";
import { sendOrderConfirmationEmail } from "../../../../utils/email";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const parsedBody = req.body;
            const userData = parsedBody.userData;
            const orderId = parsedBody.orderId;
            const order = await getOrder(orderId);

            if (order.status === "received") {
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
            }
        } catch (e) {
            console.error("Error placing order with prodigi", e.message);
        }

        res.json({ received: true });
    }
}
