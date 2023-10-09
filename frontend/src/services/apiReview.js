import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/reviews`,
    withCredentials: true,
});

export const getAllReviews = async () => {
    try {
        const { data } = await api.get("/");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getReviewById = async id => {
    try {
        const { data } = await api.get(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const createReview = async (productId, review, rating) => {
    const product = productId;
    try {
        const { data } = await api.post("/", { product, review, rating });
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const updateReview = async (id, review) => {
    try {
        const { data } = await api.patch(`/${id}`, review);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const deleteReview = async id => {
    try {
        const { data } = await api.delete(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
