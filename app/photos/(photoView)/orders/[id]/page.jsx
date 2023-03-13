import { getOrder } from "../../../../../utils/order";
import { PhotoPreview } from "../../../../../components/PhotoPreview";
import { ClearCart } from "./ClearCart";

export default async function Page({ params }) {
    const orderId = params.id;
    const orderData = await getOrder(orderId);

    return (
        <>
            <main
                style={{
                    paddingTop: "60px",
                    maxWidth: "400px",
                    margin: "0 auto",
                    textAlign: "center"
                }}
            >
                <ClearCart orderData={orderData} />
                <h1 className="text-2xl" style={{ marginBottom: "16px" }}>
                    Order Details
                </h1>
                <h2 className="text-lg" style={{ marginBottom: "16px" }}>
                    Status: Order {orderData.status}
                </h2>
                {orderData?.user?.address ? (
                    <h2 style={{ marginBottom: "16px" }}>
                        Shipping to --address here--
                    </h2>
                ) : null}
                <h2 className="text-lg">Order Contents</h2>
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
                                <p>{orderItem.photoName}</p>
                                <p>{orderItem.itemPrintSize}</p>
                                <p>{orderItem.quantity}</p>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </>
    );
}
