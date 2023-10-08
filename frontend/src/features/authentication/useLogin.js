import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth.js";
import { toast } from "react-toastify";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { search } = useLocation();
    const redirect = search ? search.split("=")[1] : "/";

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi(email, password),
        onSuccess: user => {
            queryClient.setQueryData(["user"], user);
            // navigate("/", { replace: true });
            navigate(redirect, { replace: true });
            toast.success("Login successful");
        },
        onError: error => {
            console.log(error);
            toast.error(error.message);
        },
    });
    return { login, isLoading };
};
