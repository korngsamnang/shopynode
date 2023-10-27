import { getAllProducts } from "../../services/apiProduct.js";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useProducts = () => {
    const { keyword } = useParams();
    const searchValue = keyword ? keyword : "";
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts(searchValue),
    });

    return {
        products,
        isLoading,
    };
};
