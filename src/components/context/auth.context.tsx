// src/components/context/auth.context.tsx
import { createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { info } from "../../services/userService";

// Định nghĩa kiểu cho trạng thái auth
interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        email: string;
    };
}

// Định nghĩa kiểu cho context
interface AuthContextType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
}

// Tạo context với giá trị mặc định là undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook custom để sử dụng context an toàn
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth phải được sử dụng trong AuthProvider");
    }
    return context;
};

// Props cho AuthWrapper
interface AuthWrapperProps {
    children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: {
            id: "",
            email: "",
        },
    });

    // Sử dụng useQuery để gọi hàm info từ userService
    const { data, isLoading, error } = useQuery({
        queryKey: ["userInfo"], // Khóa để cache dữ liệu
        queryFn: info, // Hàm gọi API
        enabled: !!localStorage.getItem("token"), // Chỉ gọi API nếu có token
    });

    // Cập nhật state auth khi có dữ liệu hoặc lỗi
    useEffect(() => {
        if (data) {
            setAuth({
                isAuthenticated: true,
                user: {
                    id: data.id || "",
                    email: data.email || "",
                },
            });
        } else if (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            setAuth({
                isAuthenticated: false,
                user: {
                    id: "",
                    email: "",
                },
            });
        }
    }, [data, error]);

    // Hiển thị loading trong khi chờ dữ liệu
    if (isLoading) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};