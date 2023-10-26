import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../services/apiProduct.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: createProductApi,
        onSuccess: () => {
            navigate("/admin/productlist");
            queryClient.invalidateQueries({ queryKey: ["product"] });
            toast.success("Your product has been created!");
        },
        onError: err => toast.error(err.message),
    });
    return { isLoading, createProduct };
};
