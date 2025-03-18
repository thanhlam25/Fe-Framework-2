import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Luôn gửi cookie với request
});

// Interceptor để tự động refresh token nếu gặp lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await axios.get(`${API_URL}/api/auth/refresh`, { withCredentials: true });
                return axiosInstance(error.config); // Thử lại request ban đầu
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                window.location.href = "/login"; // Chuyển về trang login nếu refresh token lỗi
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
