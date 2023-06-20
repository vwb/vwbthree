"use client";
import LinkButton from "../../../../components/LinkButton";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext, setCartItemCount } from "../../../../context/cart";
import { PhotoPreview } from "../../../../components/PhotoPreview";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CartItemCountSelector = ({ count, item, photo }) => {
    const { dispatch } = useCartContext();

    const handleChange = newCount => {
        setCartItemCount(dispatch, {
            count: newCount,
            photoName: photo.photoName,
            sku: item.sku
        });
    };

    return (
        <select
            value={count}
            onChange={e => handleChange(e.target.value)}
            style={{ padding: "4px" }}
        >
            {[0, 1, 2, 3, 4, 5].map(item => (
                <option id={item.sku} key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

const CartItem = ({ count, photo, item }) => {
    return (
        <li
            className="mb-4"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <PhotoPreview photo={photo} />
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
                <CartItemCountSelector
                    count={count}
                    item={item}
                    photo={photo}
                />
            </div>
        </li>
    );
};

export const CartItems = () => {
    const { cart, initialized } = useCartContext();
    const hasItems = !!Object.keys(cart).length;

    if (!initialized) {
        return <section></section>;
    }

    if (!hasItems) {
        return (
            <section
                className="landing"
                style={{
                    paddingTop: "35%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <div style={{ marginBottom: "24px" }}>
                    Looks like your cart is empty
                </div>
                <div className="menu-visible" style={{ fontFamily: "Simsun" }}>
                    <LinkButton href="/photos" style="dark">
                        browse photos
                    </LinkButton>
                </div>
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
                                key={`${photoItem.photo.displayName}${photoItem.item.sku}`}
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
    const { cart, dispatch } = useCartContext();
    const hasItems = !!Object.keys(cart).length;

    if (!hasItems) {
        return null;
    }

    const handleCheckout = async () => {
        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify(cart)
        });

        if (res.status === 200) {
            const body = await res.json();
            window.location.href = body.url;
        }
    };

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
                        onClick={() => handleCheckout()}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
