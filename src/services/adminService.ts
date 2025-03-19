import axiosInstance from "./axiosInstance"; // Import axiosInstance
import { IProduct } from "../types/products";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (endpoint: string): Promise<IProduct[]> => {
    try {
        const res = await axiosInstance.get<{ docs: IProduct[] }>(`${API_URL}/api/products/${endpoint}`);
        return res.data.docs || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
export const getProductById = async (id: string): Promise<IProduct | null> => {
    try {
        const res = await axiosInstance.get<IProduct>(`${API_URL}/api/products/products/${id}`);
        return res.data; // Trả về object sản phẩm trực tiếp
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null; // Trả về null nếu lỗi
    }
};

export const addProduct = async (formData: FormData) => {
    try {
        const res = await axiosInstance.post(`${API_URL}/api/admin/products`, formData);
        return res.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`${API_URL}/api/admin/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
