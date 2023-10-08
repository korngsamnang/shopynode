import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderToDelivered as updateOrderToPaidApi } from "../../services/apiOrder.js";
import { toast } from "react-toastify";
import { useOrderDetail } from "./useOrderDetail.js";

export const useUpdateOrderToDelivered = () => {
    const queryClient = useQueryClient();

    const { mutate: updateOrderToDelivered, isLoading } = useMutation({
        mutationFn: updateOrderToPaidApi,
        onSuccess: () => {
            toast.success("Order has been delivered!");
            queryClient.invalidateQueries({ queryKey: ["order"] });
        },
        onError: err => toast.error(err.message),
    });
    return { isLoading, updateOrderToDelivered };
};
