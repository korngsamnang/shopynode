import { useOrderDetail } from "../features/orders/useOrderDetail.js";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Grid } from "@mui/material";
import Message from "../ui/Message.jsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useUser } from "../features/authentication/useUser.js";
import { useUpdateOrderToPaid } from "../features/orders/useUpdateOrderToPaid.js";
import { useUpdateOrderToDelivered } from "../features/orders/useUpdateOrderToDelivered.js";
import Loading from "../ui/Loading.jsx";
import LoadingMini from "../ui/LaodingMini.jsx";

const Order = () => {
    const { order, isLoading, error } = useOrderDetail();
    const { updateOrderToPaid, isLoading: isUpdatingToPaid } =
        useUpdateOrderToPaid();
    const { updateOrderToDelivered, isLoading: isUpdatingToDelivered } =
        useUpdateOrderToDelivered();
    const { user } = useUser();

    // TESTING ONLY! REMOVE BEFORE PRODUCTION
    // async function onApproveTest() {
    //   await payOrder({ orderId, details: { payer: {} } });
    //   refetch();

    //   toast.success('Order is paid');
    // }

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <Message severity="error">{error.data.message}</Message>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Order {order.data.order._id}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Shipping
                            </Typography>
                            <Typography variant="body1">
                                <strong>Name: </strong>{" "}
                                {order.data.order.user.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email: </strong>{" "}
                                <a
                                    href={`mailto:${order.data.order.user.email}`}
                                >
                                    {order.data.order.user.email}
                                </a>
                            </Typography>
                            <Typography variant="body1">
                                <strong>Address:</strong>
                                {order.data.order.shippingAddress.address},{" "}
                                {order.data.order.shippingAddress.city}{" "}
                                {order.data.order.shippingAddress.postalCode},{" "}
                                {order.data.order.shippingAddress.country}
                            </Typography>
                            {order.data.order.isDelivered ? (
                                <Message severity="success">
                                    Delivered on {order.data.order.deliveredAt}
                                </Message>
                            ) : (
                                <Message severity="error">
                                    Not Delivered
                                </Message>
                            )}
                        </CardContent>
                    </Card>

                    <Card style={{ marginTop: "20px" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Payment Method
                            </Typography>
                            <Typography variant="body1">
                                <strong>Method: </strong>
                                {order.data.order.paymentMethod}
                            </Typography>
                            {order.data.order.isPaid ? (
                                <Message severity="success">
                                    Paid on {order.data.order.paidAt}
                                </Message>
                            ) : (
                                <Message severity="error">Not Paid</Message>
                            )}
                        </CardContent>
                    </Card>

                    <Card style={{ marginTop: "20px" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Order Items
                            </Typography>
                            {order.data.order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <>
                                    {order.data.order.orderItems.map(
                                        (item, index) => (
                                            <Card
                                                key={index}
                                                style={{ marginTop: "10px" }}
                                            >
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={1}
                                                        >
                                                            <img
                                                                src={`/images/${item.product.image}`}
                                                                alt={
                                                                    item.product
                                                                        .productName
                                                                }
                                                                style={{
                                                                    maxWidth:
                                                                        "100%",
                                                                    height: "auto",
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={8}
                                                        >
                                                            <Typography variant="body1">
                                                                <strong>
                                                                    Name:{" "}
                                                                </strong>
                                                                <Link
                                                                    to={`/product/${item.product._id}`}
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .product
                                                                            .productName
                                                                    }
                                                                </Link>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                        >
                                                            <Typography variant="body1">
                                                                {item.quantity}{" "}
                                                                x $
                                                                {
                                                                    item.product
                                                                        .price
                                                                }{" "}
                                                                = $
                                                                {item.quantity *
                                                                    item.product
                                                                        .price}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ),
                                    )}
                                </>
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
                                <strong>Items:</strong> $
                                {order.data.order.itemsPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Shipping:</strong> $
                                {order.data.order.shippingPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Tax:</strong> $
                                {order.data.order.taxPrice}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Total:</strong> $
                                {order.data.order.totalPrice}
                            </Typography>
                            {!order.data.order.isPaid && (
                                <>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        style={{ marginTop: "20px" }}
                                    >
                                        Payment
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() =>
                                            updateOrderToPaid(
                                                order.data.order._id,
                                            )
                                        }
                                        disabled={isUpdatingToPaid}
                                    >
                                        {isUpdatingToPaid ? (
                                            <LoadingMini />
                                        ) : (
                                            "Pay Now"
                                        )}
                                    </Button>
                                </>
                            )}

                            {user &&
                                user.data.user.role === "admin" &&
                                order.data.order.isPaid &&
                                !order.data.order.isDelivered && (
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() =>
                                            updateOrderToDelivered(
                                                order.data.order._id,
                                            )
                                        }
                                        disabled={isUpdatingToDelivered}
                                    >
                                        {isUpdatingToDelivered ? (
                                            <LoadingMini />
                                        ) : (
                                            "Mark As Delivered"
                                        )}
                                    </Button>
                                )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Order;
