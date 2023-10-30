import { getAllProducts } from "../../services/apiProduct.js";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search") || "";
    const page = searchParams.get("page") || 1;
    const { data: products, isLoading } = useQuery({
        queryKey: ["products", keyword, page],
        queryFn: () => getAllProducts(keyword, page, 8),
    });

    return {
        products,
        isLoading,
    };
};
