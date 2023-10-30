import { getAllProducts } from "../../services/apiProduct.js";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const { data: products, isLoading } = useQuery({
        queryKey: ["products", keyword, page],
        queryFn: () => getAllProducts(keyword, page, 8),
    });
    const totalPages = products?.totalPages;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["products", keyword, page + 1],
            queryFn: () => getAllProducts(keyword, page + 1, 8),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["products", keyword, page - 1],
            queryFn: () => getAllProducts(keyword, page - 1, 8),
        });
    }

    return {
        products,
        isLoading,
    };
};
