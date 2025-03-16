import axios from "axios";
import { Category } from "../types/categories";

const API_URL = import.meta.env.VITE_API_URL; // Lấy từ .env

export const getCategories = async () => {
    return await axios.get<{ docs: Category[] }>(`${API_URL}/api/categories/categories`);
};

