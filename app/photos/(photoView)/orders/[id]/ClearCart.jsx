"use client";
import { useEffect } from "react";

export const ClearCart = props => {
    const { orderData } = props;
    const photoStringFromOrder = orderData.items
        .map(item => item.photoId)
        .toString();

    useEffect(() => {
        const itemsFromLocaleStorage = localStorage.getItem(
            "vwbthree_photos_cart"
        );

        if (itemsFromLocaleStorage) {
            const keysFromLocalStorage = Object.keys(
                JSON.parse(itemsFromLocaleStorage)
            ).toString();

            if (photoStringFromOrder === keysFromLocalStorage) {
                localStorage.removeItem("vwbthree_photos_cart");
            }
        }
    }, [photoStringFromOrder]);

    return <></>;
};
