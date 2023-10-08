import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { clearCart } = useCart();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            clearCart();
            navigate("/login", { replace: true });
        },
    });

    return { logout, isLoading };
};
