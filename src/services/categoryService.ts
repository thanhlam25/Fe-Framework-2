import axiosInstance from "./axiosInstance"; // Import axiosInstance
import { Category } from "../types/categories";

const API_URL = import.meta.env.VITE_API_URL; // Lấy từ .env

export const getCategories = async () => {
    const response = await axiosInstance.get<{ docs: Category[] }>(`${API_URL}/api/categories/categories`);
    return response.data; // Trả về dữ liệu { docs: Category[] } thay vì AxiosResponse
};
export const addCategory = async (newCategory: { name: string; parentId: string | null; level: number }) => {
    const response = await axiosInstance.post<Category>(`${API_URL}/api/admin/categories`, newCategory);
    return response.data; // Trả về Category vừa thêm
};
export const deleteCategory = async (id: string) => {
    const response = await axiosInstance.delete(`${API_URL}/api/admin/categories/${id}`);
    return response.data;
};