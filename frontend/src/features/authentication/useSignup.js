import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: user => {
            queryClient.setQueryData(["user"], user);
            navigate("/", { replace: true });
            toast.success("Registration successful");
        },
        onError: error => {
            toast.error(error.message);
        },
    });

    return { signup, isLoading };
};
