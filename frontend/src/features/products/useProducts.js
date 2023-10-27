import { getAllProducts } from "../../services/apiProduct.js";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search") || "";
    const { data: products, isLoading } = useQuery({
        queryKey: ["products", keyword],
        queryFn: () => getAllProducts(keyword),
    });

    return {
        products,
        isLoading,
    };
};
