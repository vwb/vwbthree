import { updateOrderStatus, getOrder } from "../../../../utils/order";
import { createProdigiOrder } from "../../../../utils/fulfillment";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const parsedBody = JSON.parse(req.body);
            const userData = parsedBody.userData;
            const orderId = parsedBody.orderId;
            const order = await getOrder(orderId);

            if (order.status === "received") {
                const prodigiOrder = await createProdigiOrder(
                    orderId,
                    userData,
                    orderItems
                );
                const prodigiOrderId = prodigiOrder.order.id;

                await updateOrderStatus(orderId, "processing", {
                    prodigiOrderId
                });
            }
        } catch (e) {
            console.error("Error placing order with prodigi", e.message);
        }

        res.json({ received: true });
    }
}
