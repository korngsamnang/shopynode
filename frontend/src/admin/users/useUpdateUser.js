import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiUser.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("User has been updated");
            navigate("/admin/users");
        },
        onError: error => {
            toast.error(error.message);
        },
    });

    return { updateUser, isLoading };
};
