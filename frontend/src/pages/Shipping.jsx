import { useCart } from "../contexts/CartContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const Shipping = () => {
    const { cart, saveShippingAddress } = useCart();

    const [address, setAddress] = useState(cart.shippingAddress.address || "");
    const [city, setCity] = useState(cart.shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(
        cart.shippingAddress.postalCode || "",
    );
    const [country, setCountry] = useState(cart.shippingAddress.country || "");

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        if (!address || !city || !postalCode || !country) return;
        saveShippingAddress({ address, city, postalCode, country });
        navigate("/payment");
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Shipping
            </Typography>
            <form onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            value={address}
                            required
                            onChange={e => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="City"
                            variant="outlined"
                            value={city}
                            required
                            onChange={e => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Postal Code"
                            variant="outlined"
                            value={postalCode}
                            required
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Country"
                            variant="outlined"
                            value={country}
                            required
                            onChange={e => setCountry(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                >
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default Shipping;
