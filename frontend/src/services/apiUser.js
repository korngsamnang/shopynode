import axios from "axios";

const api = axios.create({
    baseURL: `import.meta.env.VITE_BASE_URL$/{users}`,
    // withCredentials: true,
});

export const getAllUsers = async () => {
    try {
        const { data } = await api.get("/");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getUserById = async id => {
    try {
        const { data } = await api.get(`/${id}`);
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const updateMe = async ({ name, email, password }) => {
    try {
        const { data } = await api.patch("/me", { name, email, password });
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

// export const deleteUser = async id => {
//     try {
//         const { data } = await api.delete(`/${id}`);
//         return data;
//     } catch (err) {
//         throw new Error(err?.response?.data?.message);
//     }
// };
