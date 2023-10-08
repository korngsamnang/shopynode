import Typography from "@mui/material/Typography";
import Message from "../../ui/Message.jsx";
import { useOrders } from "./useOrders.js";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Loading from "../../ui/Loading.jsx";

const OrderList = () => {
    const { allOrders, isLoading, error } = useOrders();
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message severity="error">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>USER</TableCell>
                                <TableCell>DATE</TableCell>
                                <TableCell>TOTAL</TableCell>
                                <TableCell>PAID</TableCell>
                                <TableCell>DELIVERED</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders.data.orders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>
                                        {order.user && order.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {order.createdAt.substring(0, 10)}
                                    </TableCell>
                                    <TableCell>${order.totalPrice}</TableCell>
                                    <TableCell>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            component={Link}
                                            to={`/order/${order._id}`}
                                            aria-label="Details"
                                        >
                                            <Button variant="outlined">
                                                Details
                                            </Button>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default OrderList;
