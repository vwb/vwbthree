"use client";

import { useCartContext } from "../../../../context/cart";

export const CartItems = () => {
    const { cart } = useCartContext();

    return (
        <ul>
            {Object.keys(cart).map(key => {
                return (
                    <li key={key}>
                        {key}: {JSON.stringify(cart[key])}
                    </li>
                );
            })}
        </ul>
    );
};

export const FooterContent = () => {
    const { cart, clearCart } = useCartContext();

    return (
        <div>
            I render footer content{" "}
            <div>
                <button onClick={clearCart}>clear storage</button>
            </div>
        </div>
    );
};
