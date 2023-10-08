import { getAllProducts } from "../../services/apiProduct.js";

import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return {
        products,
        isLoading,
    };
};
