import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "../../services/apiProduct.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: updateProduct, isLoading } = useMutation({
        mutationFn: updateProductApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin/productlist");
            toast.success("Product has been updated");
        },
        onError: error => {
            toast.error(error.message);
        },
    });

    return { updateProduct, isLoading };
};
