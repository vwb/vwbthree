import {
    useContext,
    createContext,
    useEffect,
    useState,
    useReducer
} from "react";
export const CART_LOCAL_KEY = "vwbthree_photos_cart";

const CartContext = createContext({});

export const useCartContext = () => {
    const val = useContext(CartContext);

    return val;
};

const CART_ACTIONS = {
    clearCart: "clearCart",
    addItemToCart: "addItemToCart",
    removeItemFromCart: "removeItemFromCart",
    setCartItemCount: "setCartItemCount",
    setCart: "setCart"
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.clearCart:
            return {};
        case CART_ACTIONS.addItemToCart:
            const photo = action.payload.photo;
            const items = action.payload.items;
            const currentItemsForPhoto = state?.[photo.photoName] || {};

            return {
                ...state,
                [photo.photoName]: addPhotoCartItems(
                    items,
                    currentItemsForPhoto,
                    photo
                )
            };
        case CART_ACTIONS.setCartItemCount:
            const photoName = action.payload.photoName;
            const sku = action.payload.sku;
            const count = action.payload.count;

            return {
                ...state,
                [photoName]: {
                    ...state[photoName],
                    [sku]: {
                        ...state[photoName][sku],
                        count: count
                    }
                }
            };
        case CART_ACTIONS.removeItemFromCart:
            const { [action.payload.sku]: removeSku, ...photoItems } = state[
                action.payload.photoName
            ];

            const removedItemState = {
                ...state,
                [action.payload.photoName]: photoItems
            };

            const cleanedState = Object.keys(removedItemState).reduce(
                (cleanState, key) => {
                    const photo = removedItemState[key];

                    if (!!Object.keys(photo).length) {
                        return {
                            ...cleanState,
                            [key]: photo
                        };
                    } else {
                        return cleanState;
                    }
                },
                {}
            );

            return cleanedState;
        case CART_ACTIONS.setCart:
            return action.payload;
        default:
            return state;
    }
};

function addPhotoCartItems(cartEntry, existingItem, photo) {
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

/**
 * @param {*} dispatch
 * @param {sku: string; photoName: string, count: number} item
 */
export const setCartItemCount = (dispatch, item) => {
    if (parseInt(item.count, 10) === 0) {
        console.log("removeitem");
        dispatch({
            type: CART_ACTIONS.removeItemFromCart,
            payload: {
                sku: item.sku,
                photoName: item.photoName
            }
        });
    } else {
        dispatch({ type: CART_ACTIONS.setCartItemCount, payload: item });
    }
};

/**
 * @param {*} dispatch
 */
export const clearCart = dispatch => {
    dispatch({ type: CART_ACTIONS.clearCart });
};

/**
 *
 * @param {*} dispatch
 * @param {photoName: {sku: {item, photo}}} item
 */
export const addItemToCart = (dispatch, item) => {
    dispatch({ type: CART_ACTIONS.addItemToCart, payload: item });
};

/**
 *
 * @param {*} dispatch
 * @param {photoName: string; sku: string;} item
 */
export const removeItemFromCart = (dispatch, item) => {
    dispatch({ type: CART_ACTIONS.removeItemFromCart, payload: item });
};

/**
 *
 * @param {} dispatch
 * @param {} cart
 */
export const setCart = (dispatch, cart) => {
    dispatch({ type: CART_ACTIONS.setCart, payload: cart });
};

export const CartContextProvider = props => {
    const [cart, dispatch] = useReducer(cartReducer, {});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const val = window.localStorage.getItem(CART_LOCAL_KEY)
            ? JSON.parse(window.localStorage.getItem(CART_LOCAL_KEY))
            : null;

        if (val && !!Object.keys(val).length)
            dispatch({ type: CART_ACTIONS.setCart, payload: val });

        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized)
            window.localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(cart));
    }, [cart, initialized]);

    return (
        <CartContext.Provider value={{ cart, dispatch, initialized }}>
            {props.children}
        </CartContext.Provider>
    );
};
