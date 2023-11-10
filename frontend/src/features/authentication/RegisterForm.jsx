import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSignup } from "./useSignup.js";
import LoadingMini from "../../ui/LaodingMini.jsx";

const RegisterForm = () => {
    const [name, setName] = useState("Chan Tola");
    const [email, setEmail] = useState("chantola@email.com");
    const [password, setPassword] = useState("test1234");
    const { signup, isLoading: isLoadingSignup } = useSignup();

    const handleRegister = e => {
        e.preventDefault();
        if (!name || !email || !password) return;
        signup(
            { name, email, password },
            {
                onSettled: () => {
                    setName("");
                    setEmail("");
                    setPassword("");
                },
            },
        );
    };

    return (
        <Box
            sx={{
                maxWidth: "500px",
                margin: "auto",
                padding: "20px",
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{ textAlign: "center", padding: "20px" }}
            >
                {isLoadingSignup ? <LoadingMini /> : "Register"}
            </Typography>
            <form
                autoComplete="off"
                onSubmit={handleRegister}
                style={{ width: "100%" }}
            >
                <TextField
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3, width: "100%" }}
                    value={name}
                    disabled={isLoadingSignup}
                />
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3, width: "100%" }}
                    value={email}
                    disabled={isLoadingSignup}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    sx={{ mb: 3, width: "100%" }}
                    disabled={isLoadingSignup}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    disabled={isLoadingSignup}
                >
                    Register
                </Button>
            </form>
            <small>
                Already have an account?{" "}
                <Link to="/login" className="underline">
                    Login here
                </Link>
            </small>
        </Box>
    );
};

export default RegisterForm;
