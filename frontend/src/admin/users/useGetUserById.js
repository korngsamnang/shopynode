import { getUserById } from "../../services/apiUser.js";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetUserById = () => {
    const { id } = useParams();
    const { data: user, isLoading } = useQuery({
        queryKey: ["userById", id],
        queryFn: () => getUserById(id),
    });

    return {
        user,
        isLoading,
    };
};
