import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Luôn gửi cookie với request
});

// Lấy token từ localStorage (nếu có)
const getToken = () => localStorage.getItem("token");

// Gắn token vào headers cho mỗi request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("API_URL:", API_URL);  // Kiểm tra giá trị API_URL
        return config;
    },
    (error) => Promise.reject(error)
);


export default axiosInstance;
