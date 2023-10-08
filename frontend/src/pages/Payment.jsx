import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const navigate = useNavigate();
    const { cart, savePaymentMethod } = useCart();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cart.shippingAddress.address, navigate]);

    const submitHandler = e => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate("/placeorder");
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Payment Method
            </Typography>
            <form onSubmit={submitHandler}>
                <RadioGroup
                    aria-label="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel
                        value="PayPal"
                        control={<Radio />}
                        label="PayPal or Credit Card"
                    />
                </RadioGroup>
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

export default Payment;
