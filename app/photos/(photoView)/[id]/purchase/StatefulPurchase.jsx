"use client";

import { useState, createContext, useContext, useMemo } from "react";

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
            <form>{props.children}</form>
        </PurchaseViewContext.Provider>
    );
}

export function FooterContent(props) {
    const { selectedItems } = usePurchaseViewContext();
    const total = Object.keys(selectedItems).reduce((sum, key) => {
        const selectedItem = selectedItems[key];
        const itemTotal = selectedItem.item.price * selectedItem.count;
        return sum + itemTotal;
    }, 0);

    return (
        <div className="mx-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl pl-6">
                    Total: {getPriceDisplay(total)}
                </h1>
                <div className="flex flex-col items-center">
                    <span className="bg-teal-700 text-gray-200 rounded-full border border-gray-300 border-solid p-3 shadow-xl">
                        Checkout
                    </span>
                </div>
            </div>
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
    const [val, setVal] = useState();
    const { setSelectedItems, selectedItems } = usePurchaseViewContext();

    const handleChange = e => {
        setVal(e.target.value);
        setSelectedItems({
            ...selectedItems,
            [product.sku]: {
                item: product,
                count: parseInt(e.target.value, 10)
            }
        });
    };

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
