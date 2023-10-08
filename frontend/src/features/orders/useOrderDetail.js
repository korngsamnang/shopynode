import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/apiOrder.js";
import { useParams } from "react-router-dom";

export const useOrderDetail = () => {
    const { id } = useParams();

    const {
        data: order,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrderById(id),
    });

    return {
        order,
        isLoading,
        error,
    };
};
