import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Select,
    TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Message from "../ui/Message.jsx";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useCart } from "../contexts/CartContext.jsx";
import MenuItem from "@mui/material/MenuItem";
import { FaTrash } from "react-icons/fa";
import { useUser } from "../features/authentication/useUser.js";
import RemoveIcon from "@mui/icons-material/Remove.js";
import AddIcon from "@mui/icons-material/Add.js";

const ShoppingCart = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    // const handleCheckout = () => {
    //     navigate("/login?redirect=/shipping");
    // };
    const { user } = useUser(); // Add this line

    const handleCheckout = () => {
        if (user) {
            // User is already authenticated, so redirect immediately
            navigate("/shipping");
        } else {
            // User is not authenticated, redirect to log in with the redirect query parameter
            navigate("/login?redirect=/shipping");
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item md={8}>
                <Typography variant="h4" style={{ marginBottom: "20px" }}>
                    Shopping Cart
                </Typography>
                {cart.cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty.{" "}
                        <Link to="/" className="underline">
                            Go Back
                        </Link>
                    </Message>
                ) : (
                    <List>
                        {cart.cartItems.map(item => (
                            <ListItem key={item._id}>
                                <ListItemAvatar>
                                    <CardMedia
                                        sx={{ height: 100 }}
                                        component="img"
                                        image={`images/${item.image}`}
                                        alt={item.productName}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Link to={`/product/${item._id}`}>
                                            {item.productName}
                                        </Link>
                                    }
                                    secondary={`Price: $${item.price}`}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <IconButton
                                        aria-label="Remove"
                                        // onClick={decrementQty}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <span style={{ margin: "0 10px" }}>
                                        {item.qty} items
                                    </span>
                                    <IconButton
                                        aria-label="Add"
                                        // onClick={incrementQty}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </div>

                                <IconButton
                                    aria-label="Remove Item"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <FaTrash />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Grid>
            <Grid item md={4}>
                <Card>
                    <CardHeader title="Summary" />
                    <CardContent>
                        <Typography variant="h6">
                            Subtotal (
                            {cart.cartItems.reduce(
                                (acc, item) => acc + item.qty,
                                0,
                            )}{" "}
                            items)
                        </Typography>
                        <Typography variant="h6">
                            $
                            {cart.cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
                                    0,
                                )
                                .toFixed(2)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={cart.cartItems.length === 0}
                            onClick={handleCheckout}
                        >
                            Proceed To Checkout
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ShoppingCart;
