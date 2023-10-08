import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { Card, CardContent, Grid } from "@mui/material";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Message from "../ui/Message.jsx";
import Button from "@mui/material/Button";
import { useCreateOrder } from "../features/orders/useCreateOrder.js";
import LoadingMini from "../ui/LaodingMini.jsx";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const { createOrder, isLoading } = useCreateOrder();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        } else if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = () => {
        const orderData = {
            orderItems: cart.cartItems.map(item => ({
                product: item._id, // Replace with the correct property name from your cart item
                quantity: item.qty, // Replace with the correct property name from your cart item
            })),
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice, // Make sure to include this if it's part of your schema
            totalPrice: cart.totalPrice,
        };

        createOrder(orderData);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Shipping
                            </Typography>
                            <Typography variant="body1">
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city}{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </Typography>
                            <Typography
                                variant="h6"
                                gutterBottom
                                style={{ marginTop: "20px" }}
                            >
                                Payment Method
                            </Typography>
                            <Typography variant="body1">
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </Typography>
                            <Typography
                                variant="h6"
                                gutterBottom
                                style={{ marginTop: "20px" }}
                            >
                                Order Items
                            </Typography>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <Grid container spacing={2}>
                                    {cart.cartItems.map((item, index) => (
                                        <Grid item xs={12} key={index}>
                                            <img
                                                src={`/images/${item.image}`}
                                                alt={item.productName}
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "100px",
                                                }}
                                            />
                                            <Typography variant="body1">
                                                <strong>Name: </strong>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {item.productName}
                                                </Link>
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Quantity: </strong>
                                                {item.qty}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Price: </strong>$
                                                {item.price}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Typography variant="body1">
                                <strong>Items:</strong> ${cart.itemsPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Shipping:</strong> ${cart.shippingPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Tax:</strong> ${cart.taxPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Total:</strong> ${cart.totalPrice}
                            </Typography>
                            {/*{error && (*/}
                            {/*    <Message variant="danger">*/}
                            {/*        {error.data.message}*/}
                            {/*    </Message>*/}
                            {/*)}*/}
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isLoading}
                                onClick={placeOrderHandler}
                                style={{ marginTop: "20px" }}
                            >
                                {isLoading ? <LoadingMini /> : "Place Order"}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default PlaceOrder;
