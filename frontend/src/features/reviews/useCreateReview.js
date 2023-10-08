import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview as createReviewApi } from "../../services/apiReview.js";
import { toast } from "react-toastify";

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    const { mutate: createReview, isLoading: isCreating } = useMutation({
        mutationFn: ({ productId, review, rating }) =>
            createReviewApi(productId, review, rating),
        onSuccess: () => {
            toast.success("Your review has been created!");
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
        onError: err => toast.error(err.message),
    });
    return { isCreating, createReview };
};
