import { getTopProducts } from "../../services/apiProduct.js";

import { useQuery } from "@tanstack/react-query";

export const useProductTopRate = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["topProducts"],
        queryFn: getTopProducts,
    });

    return {
        products,
        isLoading,
        error,
    };
};
