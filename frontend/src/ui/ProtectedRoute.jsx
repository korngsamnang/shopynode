import { useUser } from "../features/authentication/useUser.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./Loading.jsx";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    const { isAuthenticated, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) return <Loading />;

    if (isAuthenticated) return children;
};

export default ProtectedRoute;
