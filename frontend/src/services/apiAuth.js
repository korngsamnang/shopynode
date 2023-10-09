import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/auth`,
    withCredentials: true,
});

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await api.post("/signup", { name, email, password });
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await api.post("/login", { email, password });
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};

export const logout = async () => {
    try {
        const { data } = await api.post("/logout");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getLoggedInUser = async () => {
    try {
        const { data } = await api.get("/loggedin");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
