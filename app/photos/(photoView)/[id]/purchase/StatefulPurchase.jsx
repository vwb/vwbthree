"use client";

import { useState, createContext, useContext, useMemo, useRef } from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { useCartContext } from "../../../../../context/cart";
import { usePanelContext } from "../../../../../components/Panel";
import DownArrow from "../../../../../components/DownArrrow";

const getPriceDisplay = price => {
    return `$${price}.00`;
};

const PurchaseViewContext = createContext({ selectedItems: {} });
const usePurchaseViewContext = () => {
    const val = useContext(PurchaseViewContext);

    return val;
};

export function PhotoPurchaseStatefulWrapper(props) {
    const [selectedItems, setSelectedItems] = useState({});
    const providerValue = useMemo(
        () => ({
            selectedItems,
            setSelectedItems
        }),
        [selectedItems]
    );

    return (
        <PurchaseViewContext.Provider value={providerValue}>
            {props.children}
        </PurchaseViewContext.Provider>
    );
}

export function FooterContent({ photo }) {
    const [isOpen, setOpen] = usePanelContext();
    const { selectedItems, setSelectedItems } = usePurchaseViewContext();
    const { setAndPersistCart } = useCartContext();
    const addedItemsRef = useRef(null);

    const hasSelectedItems = !!Object.keys(selectedItems).length;
    const { total, itemCount } = Object.keys(selectedItems).reduce(
        (memo, key) => {
            const selectedItem = selectedItems[key];
            const itemTotal = selectedItem.item.price * selectedItem.count;
            return {
                total: memo.total + itemTotal,
                itemCount: memo.itemCount + selectedItem.count
            };
        },
        { total: 0, itemCount: 0 }
    );

    const handleAddToCart = () => {
        setAndPersistCart(photo.photoName, selectedItems);
        addedItemsRef.current = itemCount;
        setSelectedItems({});
        setOpen(true);
    };

    const buttonClasses = hasSelectedItems
        ? "bg-teal-700 text-gray-200 rounded-full border border-gray-300 border-solid p-3 shadow-xl"
        : "bg-gray-400 text-white rounded-full border border-gray-400 border-solid p-3 ";

    const panelButtonClasses = isOpen
        ? "bg-white text-gray-700 rounded-full border border-gray-700 border-solid p-3"
        : buttonClasses;

    return (
        <div className="mx-4">
            <div className="flex items-center justify-between pt-2">
                <h1 className="text-2xl pl-6">
                    {hasSelectedItems ? getPriceDisplay(total) : ""}
                </h1>
                <div className="flex flex-col items-center pr-2">
                    <button
                        onClick={
                            isOpen ? () => setOpen(false) : handleAddToCart
                        }
                        disabled={!hasSelectedItems && !isOpen}
                        className={panelButtonClasses}
                    >
                        {isOpen ? (
                            <DownArrow
                                style={{ height: "25px", fill: "#4a5568" }}
                            />
                        ) : (
                            "Add to cart"
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "25%"
                    }}
                >
                    <FiCheckCircle size="52" syle={{ fill: "#4a5568" }} />
                    <div className="text-2xl py-4">
                        {addedItemsRef.current > 1
                            ? `${addedItemsRef.current} items added to cart`
                            : `${addedItemsRef.current} item added to cart`}
                    </div>
                    <Link
                        href="/photos/cart"
                        className="bg-teal-700 text-gray-200 rounded-full border border-gray-300 border-solid p-3 shadow-xl"
                    >
                        View Cart & Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}

export function ProductSelection({ products }) {
    return (
        <ul
            style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "8px"
            }}
        >
            {products.map(product => {
                return <ProductSelect key={product.sku} product={product} />;
            })}
        </ul>
    );
}

const ProductSelect = ({ product }) => {
    const { setSelectedItems, selectedItems } = usePurchaseViewContext();

    const handleChange = e => {
        setSelectedItems({
            ...selectedItems,
            [product.sku]: {
                item: product,
                count: parseInt(e.target.value, 10)
            }
        });
    };

    const val = `${selectedItems?.[product.sku]?.count}`;

    return (
        <li
            key={product.sku}
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            <span>{product.printSize}</span>
            <span style={{ paddingBottom: "4px" }}>
                {getPriceDisplay(product.price)}
                <span style={{ paddingRight: "8px" }} />
                <select value={val} onChange={handleChange}>
                    {[0, 1, 2, 3, 4, 5].map(item => (
                        <option id={product.sku} key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </span>
        </li>
    );
};
