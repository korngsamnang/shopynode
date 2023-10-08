import { getAllOrders as getAllOrderApi } from "../../services/apiOrder.js";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
    const {
        data: allOrders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrderApi,
    });

    return {
        allOrders,
        error,
        isLoading,
    };
};
