import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/orders`,
    // withCredentials: true,
});

export const getAllOrders = async () => {
    try {
        const { data } = await api.get("/");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getOrderById = async id => {
    try {
        const { data } = await api.get(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const createOrder = async order => {
    try {
        const { data } = await api.post("/", order);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const updateOrderToPaid = async id => {
    try {
        const { data } = await api.patch(`/${id}/pay`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const updateOrderToDelivered = async id => {
    try {
        const { data } = await api.patch(`/${id}/deliver`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getMyOrders = async () => {
    try {
        const { data } = await api.get("/myorders");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
