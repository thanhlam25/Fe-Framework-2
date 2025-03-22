import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory } from "../../services/categoryService";
import { Category } from "../../types/categories";
import AdminHeader from "../../layouts/adminHeader";
import AdminMenu from "../../layouts/adminMenu";
import CategorySelector from "./CategorySelector";
import AddCategoryForm from "./addCategory";

const Categories: React.FC = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa danh mục:", error);
        },
    });
    if (isLoading) return <div>Đang tải danh mục...</div>;
    if (isError) return <div>Lỗi: {(error as Error).message}</div>;

    const categoriesData: Category[] = data?.docs || [];
    const getParentName = (parentId: string | null) => {
        if (!parentId) return "Không có";
        const parent = categoriesData.find((cat) => cat._id === parentId);
        return parent ? parent.name : "Không xác định";
    };
    const handleDelete = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <AdminHeader />
            {/* Phần giữa: Menu và Main */}
            <div className="flex flex-1 overflow-hidden">
                <AdminMenu className="w-64 bg-black p-6" />
                <main className="flex-1 overflow-auto p-8 bg-white text-black">
                    <div className="flex-1 flex flex-col">
                        <AddCategoryForm />
                        <div className="max-w-6xl p-4">
                            <h2 className="text-2xl font-bold mb-4">Quản lý danh mục</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-2 text-left">Tên danh mục</th>
                                        <th className="border border-gray-300 p-2 text-left">Cấp độ</th>
                                        <th className="border border-gray-300 p-2 text-left">Danh mục cha</th>
                                        <th className="border border-gray-300 p-2 text-left">Ngày tạo</th>
                                        <th className="border border-gray-300 p-2 text-left">Ngày cập nhật</th>
                                        <th className="border border-gray-300 p-2 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriesData.length > 0 ? (
                                        categoriesData.map((cat) => (
                                            <tr key={cat._id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2" style={{ paddingLeft: `${cat.level * 20}px` }}>
                                                    {cat.name}
                                                </td>
                                                <td className="border border-gray-300 p-2">{cat.level}</td>
                                                <td className="border border-gray-300 p-2">{getParentName(cat.parentId)}</td>
                                                <td className="border border-gray-300 p-2">
                                                    {new Date(cat.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {new Date(cat.updatedAt).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <button
                                                        className="text-blue-600 hover:underline mr-2"
                                                        onClick={() => alert(`Chi tiết: ${JSON.stringify(cat)}`)}
                                                    >
                                                        Xem
                                                    </button>
                                                    <button
                                                        className="text-yellow-600 hover:underline mr-2"
                                                        onClick={() => alert(`Chỉnh sửa: ${cat.name}`)}
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:underline"
                                                        onClick={() => handleDelete(cat._id)}
                                                        disabled={deleteMutation.isPending}
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="border border-gray-300 p-2 text-center">
                                                Không có danh mục nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Categories;