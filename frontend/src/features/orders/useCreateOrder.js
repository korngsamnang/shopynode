import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";

export const useCreateOrder = () => {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { clearCartItems } = useCart();

    const { mutate: createOrder, isLoading } = useMutation({
        mutationFn: createOrderApi,
        onSuccess: order => {
            toast.success("Your order has been created!");
            navigate(`/order/${order.data.order._id}`);
            clearCartItems();
            // queryClient.invalidateQueries({ queryKey: ["product"] });
        },
        onError: err => toast.error(err.message),
    });
    return { isLoading, createOrder };
};
