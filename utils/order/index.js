import { db, ORDER_DYNAMO_TABLE } from "../../db";
import shortUUID from "short-uuid";

const defaultOrderParams = {
    TableName: ORDER_DYNAMO_TABLE
};

function getItemsFromLineItems(lineItems) {
    return lineItems.map(lineItem => ({
        sku: lineItem.price_data.product_data.metadata.sku,
        photoId: lineItem.price_data.product_data.metadata.photoId,
        photoUrl: lineItem.price_data.product_data.metadata.photoUrl,
        photoName: lineItem.price_data.product_data.metadata.photoName,
        itemPrintSize: lineItem.price_data.product_data.metadata.itemPrintSize,
        quantity: lineItem.quantity
    }));
}

/**
 * interface AddressObject {
 *  city: string;
 *  country: string;
 *  line1: string;
 *  line2: string | null;
 *  postal_code: string;
 *  state: string;
 * }
 *
 * interface UserObject {
 *  email: string;
 *  shipping_address: AddressObject;
 *  name: string;
 * }
 *
 * * interface OrderItem {
 *  sku: string; //GLOBAL_PAP_10x12
 *  photoId: string; //DC12312
 * }
 *
 * {
 *  order_id: string;
 *  items: OrderItem[];
 *  total: number;
 *  user: UserObject;
 *  status: 'received' | 'processing' | 'cancelled' | 'shipped' | 'completed' ;
 * }
 *
 * @param {*} orderId
 * @param {*} lineItems
 * @returns
 *
 */

export async function createOrder(orderId, lineItems) {
    const params = {
        ...defaultOrderParams,
        Item: {
            order_id: orderId,
            items: getItemsFromLineItems(lineItems),
            status: "received"
        }
    };
    try {
        const createdOrder = await db.put(params).promise();
        return createdOrder;
    } catch (e) {
        console.error(e);
        throw new Error("Unable to create new order");
    }
}

export async function deleteOrder(orderId) {
    const params = {
        ...defaultOrderParams,
        Key: {
            order_id: orderId
        }
    };
    try {
        await db.delete(params).promise();
    } catch (e) {
        console.error(e);
        throw new Error("Unable to delete order");
    }
}

export async function getOrder(orderId) {
    const params = {
        ...defaultOrderParams,
        ExpressionAttributeValues: {
            ":orderId": orderId
        },
        KeyConditionExpression: "order_id = :orderId"
    };
    try {
        const orderItem = await db.query(params).promise();

        return orderItem?.Items[0];
    } catch (e) {
        console.error(e);
        throw new Error("Unable to get new order");
    }
}

function addAttributeToUpdateParams(params, key, value) {
    const identifier = shortUUID("abcdefghijkmnopqrstuvwxyz").generate();
    const expressionAttributeNameKey = `#${identifier.toUpperCase()}`;
    const expressionAttributeValueKey = `:${identifier}`;

    const initialUpdateExpression = `SET ${expressionAttributeNameKey} = ${expressionAttributeValueKey}`;

    params = {
        ...params,
        UpdateExpression: !!params.UpdateExpression
            ? `${params.UpdateExpression}, ${expressionAttributeNameKey} = ${expressionAttributeValueKey}`
            : initialUpdateExpression,
        ExpressionAttributeNames: {
            ...params.ExpressionAttributeNames,
            [expressionAttributeNameKey]: key
        },
        ExpressionAttributeValues: {
            ...params.ExpressionAttributeValues,
            [expressionAttributeValueKey]: value
        }
    };

    return params;
}

/**
 * metadata: {
 *  user: UserObject;
 *  stripeCheckoutSessionId: string;
 *  prodigiOrderId: string;
 * }
 *
 *
 * @param {*} orderId string
 * @param {*} status 'received' | 'processing' | 'cancelled' | 'shipped' | 'completed'
 * @param {*} metadata UserObject
 */
export async function updateOrderStatus(orderId, status, metadata = {}) {
    let params = {
        ...defaultOrderParams,
        Key: {
            order_id: orderId
        },
        UpdateExpression: "",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    };

    params = addAttributeToUpdateParams(params, "status", status);

    if (metadata.user) {
        params = addAttributeToUpdateParams(params, "user", metadata.user);
    }

    if (metadata.prodigiOrderId) {
        params = addAttributeToUpdateParams(
            params,
            "prodigiOrderId",
            metadata.prodigiOrderId
        );
    }

    if (metadata.stripeCheckoutSessionId) {
        params = addAttributeToUpdateParams(
            params,
            "stripeCheckoutSessionId",
            metadata.stripeCheckoutSessionId
        );
    }

    try {
        await db.update(params).promise();
    } catch (e) {
        console.error(e);
        throw new Error(
            `Unable to update order status for ${orderId}`,
            e.message
        );
    }
}
