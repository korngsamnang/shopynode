import axios from "axios";

console.log(import.meta.env.VITE_BASE_URL);
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/products`,
    withCredentials: true,
});

export const getAllProducts = async keyword => {
    try {
        const { data } = await api.get(`/?search=${keyword}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getProductById = async id => {
    try {
        const { data } = await api.get(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const createProduct = async ({ product }) => {
    try {
        const { data } = await api.post("/", product);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const updateProduct = async ({ id, product }) => {
    try {
        const { data } = await api.patch(`/${id}`, product);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const deleteProduct = async id => {
    try {
        const { data } = await api.delete(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getTopProducts = async () => {
    try {
        const { data } = await api.get("/top");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
