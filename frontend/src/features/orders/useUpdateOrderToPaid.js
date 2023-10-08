import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderToPaid as updateOrderToPaidApi } from "../../services/apiOrder.js";
import { toast } from "react-toastify";

export const useUpdateOrderToPaid = () => {
    const queryClient = useQueryClient();

    const { mutate: updateOrderToPaid, isLoading } = useMutation({
        mutationFn: updateOrderToPaidApi,
        onSuccess: () => {
            toast.success("Your order has been paid!");
            queryClient.invalidateQueries({ queryKey: ["order"] });
        },
        onError: err => toast.error(err.message),
    });
    return { isLoading, updateOrderToPaid };
};
