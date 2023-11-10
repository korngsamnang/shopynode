import { useEffect, useState } from "react";
import { useLogin } from "./useLogin.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUser } from "./useUser.js";
import LoadingMini from "../../ui/LaodingMini.jsx";

const LoginForm = () => {
    const [email, setEmail] = useState("john@example.com");
    const [password, setPassword] = useState("test1234");
    const navigate = useNavigate();

    const { login, isLoading: isLoadingLogin } = useLogin();
    const { user, isLoading: isLoadingUser } = useUser();

    const { search } = useLocation();
    const redirect = search ? search.split("=")[1] : "/";

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, redirect, user]);

    const handleLogin = e => {
        e.preventDefault();
        if (!email || !password) return;
        login(
            { email, password },
            {
                onSettled: () => {
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
                {isLoadingLogin ? <LoadingMini /> : "Login"}
            </Typography>
            <form
                autoComplete="off"
                onSubmit={handleLogin}
                style={{ width: "100%" }}
            >
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3, width: "100%" }}
                    value={email}
                    disabled={isLoadingLogin}
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
                    disabled={isLoadingLogin}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    disabled={isLoadingLogin}
                >
                    Login
                </Button>
            </form>
            <small>
                Need an account?{" "}
                <Link to="/register" className="underline">
                    Register here
                </Link>
            </small>
        </Box>
    );
};

export default LoginForm;
