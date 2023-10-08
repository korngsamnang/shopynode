import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/authentication/useUser.js";

const AdminRoute = () => {
    const { user } = useUser();

    return user && user.data.user.role === "admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default AdminRoute;
