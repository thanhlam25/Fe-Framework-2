import axios from "axios";
import { IProduct } from "../types/products";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (endpoint: string): Promise<IProduct[]> => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get<{ docs: IProduct[] }>(`${API_URL}/api/products/${endpoint}`);
        return res.data.docs || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const addProduct = async (product: IProduct) => {
    try {
        const res = await axios.post(`${API_URL}/api/products/products`, product);
        return res.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// Hàm xóa sản phẩm theo ID
export const deleteProduct = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}/api/products/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error; // Throw error for further handling
    }
};
