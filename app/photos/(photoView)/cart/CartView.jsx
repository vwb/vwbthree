"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "../../../../context/cart";

const CartItem = ({ count, photo, item }) => {
    return (
        <li
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <div
                style={{
                    width: "110px",
                    height: "160px",
                    position: "relative",
                    marginRight: "8px"
                }}
            >
                <Image
                    src={photo.url}
                    fill
                    sizes="200px"
                    style={{
                        objectFit: "contain",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.33))"
                    }}
                />
            </div>
            <div
                className="text-sm"
                style={{ marginLeft: "8px", marginRight: "8px" }}
            >
                <div>{photo.displayName.replaceAll("-", " ")}</div>
                <div>{item.printSize}</div>
                <div>{formatPriceDisplay(item.price)}</div>
            </div>
            <div
                style={{
                    marginLeft: "8px",
                    marginRight: "8px",
                    textAlign: "end",
                    flexGrow: "1"
                }}
            >
                Quantity: {count}
            </div>
        </li>
    );
};

export const CartItems = () => {
    const { cart } = useCartContext();
    const hasItems = !!Object.keys(cart).length;

    if (!hasItems) {
        return (
            <section style={{ paddingTop: "25%" }}>
                <div>Looks like your cart is empty</div>
                <Link href="/photos">Browse photos</Link>
            </section>
        );
    }

    return (
        <>
            <h1 className="text-2xl ml-4">Order Summary</h1>
            <ul className="ml-4">
                {Object.keys(cart).map(key => {
                    const photoItems = cart[key];

                    return Object.keys(photoItems).map(sku => {
                        const photoItem = photoItems[sku];
                        return (
                            <CartItem
                                count={photoItem.count}
                                photo={photoItem.photo}
                                item={photoItem.item}
                            />
                        );
                    });
                })}
            </ul>
        </>
    );
};

function formatPriceDisplay(number) {
    return `$${number}.00`;
}

function getPriceDisplay(cart) {
    const total = Object.keys(cart).reduce((memo, photoKey) => {
        const photoItems = cart[photoKey];
        const totalForPhoto = Object.keys(photoItems).reduce((memo, sku) => {
            const product = photoItems[sku];
            return memo + product.item.price * product.count;
        }, 0);

        return memo + totalForPhoto;
    }, 0);

    return formatPriceDisplay(total);
}

export const FooterContent = () => {
    const { cart, clearCart } = useCartContext();
    const hasItems = !!Object.keys(cart).length;

    if (!hasItems) {
        return null;
    }

    return (
        <div className="mx-4">
            <div className="flex items-center justify-between pt-2">
                <h1 className="text-2xl pl-6">
                    {hasItems ? getPriceDisplay(cart) : ""}{" "}
                    {/* <span className="text-xs">{shippingString}</span> */}
                </h1>
                <div className="flex flex-col items-center pr-2">
                    <button
                        className="bg-teal-700 text-gray-200 rounded-full border border-gray-300 border-solid p-3 shadow-xl"
                        onClick={clearCart}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
