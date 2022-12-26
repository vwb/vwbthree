"use client";

import { CartContextProvider } from "../../context/cart";

export default function PhotoSegmentRoot({ children }) {
    return <CartContextProvider>{children}</CartContextProvider>;
}
