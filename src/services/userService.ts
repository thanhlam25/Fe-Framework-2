import axios from "axios";
import { Login } from "../types/users";
import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data: Login) => {
    const res = await axiosInstance.post("/api/auth/login", data);
    return res.data;
};
export const logout = async () => {
    const res = await axiosInstance.post("/api/auth/logout");
    return res.data;
};
export const info = async () => {
    const res = await axiosInstance.post("/api/auth/info");
    return res.data;
};
