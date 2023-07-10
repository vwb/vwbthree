import { getOrder } from "../../../../../utils/order";
import { getProdigiOrder } from "../../../../../utils/prodigi";
import Link from "next/link";
import { PhotoPreview } from "../../../../../components/PhotoPreview";
import { ClearCart } from "./ClearCart";

const ORDER_STATUS_CONTENT_MAP = {
    processing: {
        emoji: "🛠",
        content: () => (
            <section className="mx-12">
                <p>Your order is being processed.</p>
                <p>Tracking information will be here when available.</p>
            </section>
        ),
        header: "Processing"
    },
    shipped: {
        emoji: "🚚",
        header: "Shipped",
        content: ({ prodigiShipping }) => (
            <>
                {prodigiShipping.map(shipment => (
                    <div className="mt-5" key={shipment.id}>
                        <Link
                            className="text-blue-700 underline text-lg"
                            href={shipment.tracking.url}
                        >
                            🔎 Track Shipment
                        </Link>
                        <p className="text-gray-600 text-xs mt-1">
                            Tracking Number: {shipment.tracking.number}
                        </p>
                        <p className="text-gray-600 text-xs">
                            Carrier: {shipment.carrier.name}
                        </p>
                    </div>
                ))}
            </>
        )
    },
    received: {
        header: "Received",
        emoji: "🎉",
        content: () => null
    },
    created: {
        header: "Created",
        emoji: "🎉",
        content: () => null
    },
    error: {
        header: "Error: Oops!",
        emoji: "✖︎",
        content: ({ orderId }) => (
            <section className="mx-20">
                <p>There has been an issue processing your order.</p>
                <p className="my-4">Check back here for updates.</p>

                <p>
                    If you'd like to request a refund, contact us{" "}
                    <Link
                        className="text-blue-700 underline text-lg"
                        href={`mailto:vwbthree.photos@gmail.com?subject=Refund%20Request%20Order%20${orderId}`}
                    >
                        here
                    </Link>{" "}
                    and we'll get right on it.
                </p>
            </section>
        )
    }
};

const OrderSectionHeader = props => {
    return <h3 className="text-lg pb-2">{props.children}</h3>;
};

const OrderStatus = props => {
    const orderStatus = ORDER_STATUS_CONTENT_MAP[props.orderStatus];

    return (
        <section className="my-8">
            <section className="mb-3">
                <h1 className="text-3xl">Order {orderStatus.header}</h1>
                <p className="text-gray-800 text-xs"># {props.orderId}</p>
            </section>
            <h2 className="text-5xl py-3">{orderStatus.emoji}</h2>
            {orderStatus.content(props.dynamicContent)}
        </section>
    );
};

const OrderShipping = props => {
    return (
        <section className="my-8">
            <OrderSectionHeader>Shipping</OrderSectionHeader>
            <p>{props.name}</p>
            <p>{props.shipping.line1}</p>
            <p>{props.shipping.line2}</p>
            <p>
                {props.shipping.state} {props.shipping.country}{" "}
                {props.shipping.postal_code}
            </p>
        </section>
    );
};

const OrderContact = props => {
    return (
        <section className="my-8">
            <OrderSectionHeader>Contact</OrderSectionHeader>
            <p className="">{props.children}</p>
        </section>
    );
};

const Divider = ({
    width = "100%",
    color = "lightgray",
    verticalMargin = "3rem"
}) => {
    return (
        <div
            style={{
                border: `1px solid ${color}`,
                width: width,
                margin: `${verticalMargin} auto`
            }}
        />
    );
};

const Support = props => {
    const mailToLink = `mailto:vwbthree.photos@gmail.com?subject=Request%20for%20Order%20${props.orderId}&body=Describe%20your%20issue%20here`;

    return (
        <p className="mx-12">
            Something not look right? Didn't receive a confirmation email? Reach
            out{" "}
            <Link className="text-blue-700 underline text-lg" href={mailToLink}>
                here
            </Link>{" "}
            and we'll get it sorted out.
        </p>
    );
};

export default async function Page({ params }) {
    const orderId = params.id;
    const orderData = await getOrder(orderId);
    let prodigiOrder;

    if (orderData.status === "shipped" && orderData.prodigiOrderId) {
        prodigiOrder = await getProdigiOrder(orderData.prodigiOrderId);
    }

    return (
        <>
            <main
                style={{
                    paddingTop: "80px",
                    paddingBottom: "80px",
                    maxWidth: "480px",
                    margin: "0 auto",
                    textAlign: "center"
                }}
            >
                <ClearCart orderData={orderData} />
                <OrderStatus
                    orderStatus={orderData.status}
                    dynamicContent={{
                        prodigiShipping: prodigiOrder?.order?.shipments,
                        orderId: orderId
                    }}
                    orderId={orderId}
                />
                <Divider verticalMargin="3.5rem" />
                <h2 className="text-2xl">Order Details</h2>
                <OrderContact>{orderData.user.email}</OrderContact>
                <Divider width="50%" color="#EFEFEF" />
                <OrderShipping
                    shipping={orderData.user.shipping_address.address}
                    name={orderData.user.shipping_address.name}
                />
                <Divider width="50%" color="#EFEFEF" />
                <OrderSectionHeader>Order Summary</OrderSectionHeader>
                <ul
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    {orderData.items.map(orderItem => {
                        return (
                            <li
                                key={`${orderItem.photoId}-${orderItem.sku}`}
                                style={{
                                    marginBottom: "12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <PhotoPreview
                                    photo={{
                                        url: orderItem.photoUrl,
                                        displayName: orderItem.photoName,
                                        photoName: orderItem.photoId
                                    }}
                                />
                                <p className="mt-1">
                                    {orderItem.itemPrintSize}
                                </p>
                                <p>
                                    {orderItem.quantity}{" "}
                                    {orderItem.quantity > 1
                                        ? "prints"
                                        : "print"}
                                </p>
                            </li>
                        );
                    })}
                </ul>
                <Divider width="50%" color="#EFEFEF" />
                <Support orderId={orderId} />
            </main>
        </>
    );
}
