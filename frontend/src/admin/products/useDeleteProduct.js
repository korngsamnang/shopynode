import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProduct.js";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
        mutationFn: deleteProductApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success("Product successfully deleted");
        },
        onError: err => toast.error(err.message),
    });
    return { isDeleting, deleteProduct };
};
