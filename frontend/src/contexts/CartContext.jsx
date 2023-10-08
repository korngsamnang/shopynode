import { createContext, useContext, useState } from "react";
import { updateCart } from "../utils/cartUtils.js";

const CartContext = createContext({});

const shoppingCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(shoppingCart);

    const addToCart = (product, qty) => {
        const {
            brand,
            description,
            _id,
            image,
            numReviews,
            price,
            productName,
            stockQuantity,
        } = product;
        const item = cart.cartItems.find(i => i._id === product._id);
        if (item) {
            const newCart = {
                ...cart,
                cartItems: cart.cartItems.map(i =>
                    i._id === item._id ? { ...item, qty } : i,
                ),
            };
            setCart(updateCart(newCart));
        } else {
            const newCart = {
                ...cart,
                cartItems: [
                    ...cart.cartItems,
                    {
                        brand,
                        description,
                        _id,
                        image,
                        numReviews,
                        price,
                        productName,
                        stockQuantity,
                        qty,
                    },
                ],
            };
            setCart(updateCart(newCart));
        }
    };

    const removeFromCart = id => {
        const newCart = {
            ...cart,
            cartItems: cart.cartItems.filter(i => i._id !== id),
        };
        setCart(updateCart(newCart));
    };
    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart({
            cartItems: [],
            shippingAddress: {},
            paymentMethod: "PayPal",
        });
    };
    const saveShippingAddress = data => {
        const newCart = {
            ...cart,
            shippingAddress: data,
        };
        setCart(updateCart(newCart));
    };
    const savePaymentMethod = data => {
        const newCart = {
            ...cart,
            paymentMethod: data,
        };
        setCart(updateCart(newCart));
    };
    const clearCartItems = () => {
        const newCart = {
            ...cart,
            cartItems: [],
        };
        setCart(updateCart(newCart));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                clearCart,
                saveShippingAddress,
                savePaymentMethod,
                removeFromCart,
                clearCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error(`useCart must be used within a CartProvider`);
    }
    return context;
};

export default CartContext;

//Fix localstorage store reviews
// Fix cart fields object
