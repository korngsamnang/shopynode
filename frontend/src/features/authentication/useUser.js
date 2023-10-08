import { getLoggedInUser } from "../../services/apiAuth.js";

import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getLoggedInUser,
    });

    return {
        user,
        isLoading,
        isAuthenticated: user?.status === "success",
    };
};
