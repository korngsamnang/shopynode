import { useEffect, useState } from "react";
import { useUser } from "../features/authentication/useUser.js";
import {
    Card,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Message from "../ui/Message.jsx";
import { Link } from "react-router-dom";
import { useMyOrders } from "../features/orders/useMyOrders.js";
import { useUpdateMe } from "../features/users/useUpdateMe.js";
import Loading from "../ui/Loading.jsx";
import LoadingMini from "../ui/LaodingMini.jsx";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { myOrders, isLoading, error } = useMyOrders();
    const { updateMe, isLoading: isUpdating } = useUpdateMe();

    const { user } = useUser();

    const handleUpdateMe = e => {
        e.preventDefault();
        if (!name || !email) return;
        updateMe({ name, email, password });
    };

    useEffect(() => {
        setName(user.data.user.name);
        setEmail(user.data.user.email);
    }, [user.data.user.email, user.data.user.name]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Typography variant="h4" gutterBottom>
                    User Profile
                </Typography>

                <form>
                    <TextField
                        fullWidth
                        // className="my-2"

                        id="name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={isUpdating}
                    />
                    <TextField
                        fullWidth
                        // className="my-2"
                        sx={{ my: 2 }}
                        id="email"
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={isUpdating}
                    />
                    <TextField
                        fullWidth
                        className="my-2"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={isUpdating}
                    />
                    <Button
                        sx={{ my: 2 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleUpdateMe}
                        disabled={isUpdating}
                    >
                        {isUpdating ? <LoadingMini /> : "Update"}
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                    My Orders
                </Typography>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Message severity="error">
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <TableContainer component={Card}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>DATE</TableCell>
                                    <TableCell>TOTAL</TableCell>
                                    <TableCell>PAID</TableCell>
                                    <TableCell>DELIVERED</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {myOrders.data.orders.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>
                                            {order.createdAt.substring(0, 10)}
                                        </TableCell>
                                        <TableCell>
                                            ${order.totalPrice}
                                        </TableCell>
                                        <TableCell>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                >
                                                    Not Paid
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    10,
                                                )
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                >
                                                    Not Delivered
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/order/${order._id}`}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Details
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
        </Grid>
    );
};

export default Profile;
