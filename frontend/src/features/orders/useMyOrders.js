import { getMyOrders } from "../../services/apiOrder.js";
import { useQuery } from "@tanstack/react-query";

export const useMyOrders = () => {
    const {
        data: myOrders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["myOrders"],
        queryFn: getMyOrders,
    });

    return {
        myOrders,
        error,
        isLoading,
    };
};
