"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from "./Badge";
import { useCartContext } from "../context/cart";

export const CheckoutLink = ({ href }) => {
    const { cart } = useCartContext();
    const hasCart = !!cart && Object.keys(cart).length > 0;

    return (
        <Link href={href}>
            <div style={{ position: "relative" }}>
                <FiShoppingCart size={26} />
                {hasCart && <Badge />}
            </div>
        </Link>
    );
};
