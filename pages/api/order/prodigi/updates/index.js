import { updateOrderStatus } from "../../../../../utils/order";

const PRODIGI_STATUS_MAP = {
    Complete: "shipped",
    Cancelled: "cancelled"
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const orderId = req.body.data.order.idempotencyKey;
        const prodigiStatus = req.body.order.status.stage;
        const statusUpdate = PRODIGI_STATUS_MAP[prodigiStatus];

        try {
            if (!!statusUpdate) {
                updateOrderStatus(orderId, statusUpdate);
                //trigger email
            }
        } catch (e) {
            console.error("Error updating order status", e.message);
        }

        res.json({ received: true });
    }
}
