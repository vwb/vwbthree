import {
    useContext,
    createContext,
    useEffect,
    useState,
    useCallback
} from "react";
export const CART_LOCAL_KEY = "vwbthree_photos_cart";

const CartContext = createContext({});

export const useCartContext = () => {
    const val = useContext(CartContext);

    return val;
};

function getPhotoCartItems(cartEntry, existingItem) {
    return Object.keys(cartEntry).reduce((memo, sku) => {
        if (memo[sku]) {
            return {
                ...memo,
                [sku]: {
                    ...memo[sku],
                    count: memo[sku].count + cartEntry[sku].count
                }
            };
        } else {
            return { ...memo, [sku]: cartEntry[sku] };
        }
    }, existingItem);
}

export const CartContextProvider = props => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const val = window.localStorage.getItem(CART_LOCAL_KEY)
            ? JSON.parse(window.localStorage.getItem(CART_LOCAL_KEY))
            : null;

        if (val) setCart(val);
    }, [setCart]);

    const setAndPersistCart = useCallback(
        (photoName, cartEntry) => {
            const existingItem = cart?.[photoName] || {};

            const newCart = {
                ...cart,
                [photoName]: getPhotoCartItems(cartEntry, existingItem)
            };

            setCart(newCart);
            window.localStorage.setItem(
                CART_LOCAL_KEY,
                JSON.stringify(newCart)
            );
        },
        [cart]
    );

    const clearCart = useCallback(() => {
        setCart({});
        window.localStorage.setItem(CART_LOCAL_KEY, JSON.stringify({}));
    });

    return (
        <CartContext.Provider value={{ cart, setAndPersistCart, clearCart }}>
            {props.children}
        </CartContext.Provider>
    );
};
