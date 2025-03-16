import axios from "axios";
import { IProduct } from "../types/products";

const API_URL = import.meta.env.VITE_API_URL; // Lấy từ .env

export const addProduct = async (product: any) => {
    return axios.post(`${API_URL}/api/products/products`, product).then((res) => res.data);
};
export const getProducts = async () => {
    return await axios.get<{ docs: IProduct[] }>(`${API_URL}/api/products/products`);
};
export const deleteProduct = async (product: any) => {
    return axios.get(`${API_URL}/api/products/products/:id`, product).then((res) => res.data);
};

