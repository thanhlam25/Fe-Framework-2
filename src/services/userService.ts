import axios from "axios";
import { Login, RegisterForm } from "../types/users";
import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data: Login) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
};
export const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};
export const info = async () => {
    const res = await axiosInstance.post("/auth/info");
    return res.data;
};
export const register = async (userData: RegisterForm): Promise<RegisterForm> => {
    const response = await axiosInstance.post("/auth/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

