export const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = cart => {
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
    cart.shippingPrice = addDecimals(cart.cartItems.itemsPrice > 100 ? 0 : 100);

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));

    return cart;
};
