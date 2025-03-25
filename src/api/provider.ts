import axiosInstance from "../services/axiosInstance";

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

export type ProviderProps = {
    namespace: string;
    endpoint: string;
    id?: string;
    values?: FormData;
};

export const getList = async ({ namespace = "products", endpoint = "products" }: ProviderProps) => {
    try {
        const { data } = await axiosInstance.get(`/${namespace}`);
        return data?.docs || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
export const getById = async ({ namespace = "products", endpoint = "products", id }: ProviderProps) => {
    try {
        const { data } = await axiosInstance.get(`/${namespace}/${id}`);
        return data || [];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};
export const deleteById = async ({ namespace, endpoint, id }: ProviderProps) => {
    try {
        const { data } = await axiosInstance.delete(`/${namespace}/${endpoint}/${id}`);
        return data || [];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};
export const addItem = async ({ namespace, endpoint, values }: ProviderProps) => {
    try {
        const { data } = await axiosInstance.post(`/${namespace}/${endpoint}`, values);
        return data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};