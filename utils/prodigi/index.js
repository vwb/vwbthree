export async function getProdigiOrder(prodigiOrderId) {
    const prodigiOrderRequest = await fetch(
        `https://${process.env.PRODIGI_ROOT_URL}/v4.0/orders/${prodigiOrderId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": `${process.env.PRODIGI_API_KEY}`
            }
        }
    );
    const prodigiOrderContent = await prodigiOrderRequest.json();

    if (prodigiOrderRequest.status >= 400) {
        console.error("ProdigiOrderStatusCode: ", prodigiOrderRequest.status);
        throw new Error(JSON.stringify(prodigiOrderContent));
    }

    return prodigiOrderContent;
}

export async function postProdigiOrder({
    recipient,
    formattedProducts,
    orderId
}) {
    const prodigiOrderRequest = await fetch(
        `https://${process.env.PRODIGI_ROOT_URL}/v4.0/Orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": `${process.env.PRODIGI_API_KEY}`
            },
            body: JSON.stringify({
                recipient,
                items: formattedProducts,
                shippingMethod: "Budget",
                idempotencyKey: orderId
            })
        }
    );
    const prodigiOrderContent = await prodigiOrderRequest.json();

    if (prodigiOrderRequest.status >= 400) {
        console.error("ProdigiOrderStatusCode: ", prodigiOrderRequest.status);
        throw new Error(JSON.stringify(prodigiOrderContent));
    }

    console.log(
        "Successfully created prodigiorder: ",
        prodigiOrderContent.order.id
    );
    console.log("Prodigi order success outcome: ", prodigiOrderContent.outcome);

    return prodigiOrderContent;
}
