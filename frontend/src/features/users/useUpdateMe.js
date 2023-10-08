import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeApi } from "../../services/apiUser.js";
import { toast } from "react-toastify";

export const useUpdateMe = () => {
    const queryClient = useQueryClient();
    const { mutate: updateMe, isLoading } = useMutation({
        mutationFn: updateMeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Your profile has been updated");
        },
        onError: error => {
            toast.error(error.message);
        },
    });

    return { updateMe, isLoading };
};
