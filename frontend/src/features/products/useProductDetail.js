import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiProduct.js";
import { useParams } from "react-router-dom";

export const useProductDetail = () => {
    const { id } = useParams();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
    });

    return {
        product,
        isLoading,
    };
};
