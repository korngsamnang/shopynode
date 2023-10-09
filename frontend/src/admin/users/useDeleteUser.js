import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUser.js";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            toast.success("User successfully deleted");
        },
        onError: err => toast.error(err.message),
    });
    return { isDeleting, deleteUser };
};
