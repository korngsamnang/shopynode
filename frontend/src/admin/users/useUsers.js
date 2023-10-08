import { getAllUsers } from "../../services/apiUser.js";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    const {
        data: allUsers,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    return {
        allUsers,
        error,
        isLoading,
    };
};
