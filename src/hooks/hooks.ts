import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { addItem, ProviderProps } from "../api/provider";
import { IProduct } from "../types/products";

// Nếu có định nghĩa ErrorResponse
interface ErrorResponse {
    errors?: string[];
}

export const useAddItem = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<IProduct, AxiosError, FormData>({
        mutationFn: (formData: FormData) =>
            addItem({ namespace: "admin", endpoint: "products", values: formData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin/products");
        },
        onError: (error) => {
            const errorData = error.response?.data as ErrorResponse | undefined;
            console.error("Lỗi từ server:", errorData);
            if (errorData?.errors) {
                alert("Lỗi validation: " + errorData.errors.join(", "));
            } else {
                alert("Có lỗi xảy ra khi thêm sản phẩm!");
            }
        },
    });
};
