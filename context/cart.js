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

function getPhotoCartItems(cartEntry, existingItem, photo) {
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
            return { ...memo, [sku]: { ...cartEntry[sku], photo } };
        }
    }, existingItem);
}

//TODO: replace cart with a reducer
//build out cart UI

export const CartContextProvider = props => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const val = window.localStorage.getItem(CART_LOCAL_KEY)
            ? JSON.parse(window.localStorage.getItem(CART_LOCAL_KEY))
            : null;

        if (val) setCart(val);
    }, [setCart]);

    const setAndPersistCart = useCallback(
        (photo, cartEntry) => {
            const existingItem = cart?.[photo.photoName] || {};

            const newCart = {
                ...cart,
                [photo.photoName]: getPhotoCartItems(
                    cartEntry,
                    existingItem,
                    photo
                )
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
