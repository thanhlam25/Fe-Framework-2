import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory } from "../../services/categoryService";
import { Category } from "../../types/categories";
import AdminHeader from "../../layouts/adminHeader";
import AdminMenu from "../../layouts/adminMenu";
import AddCategoryForm from "./addCategory";

interface CategoryResponse {
    docs: Category[];
}

const CategoryItem: React.FC<{
    category: Category;
    categories: Category[];
    onDelete: (id: string) => void;
}> = ({ category, categories, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const children = categories.filter((cat) => cat.parentId === category._id);

    return (
        <li className="mb-2">
            <div className="flex items-center">
                <span className="font-semibold">{category.name}</span>
                {children.length > 0 && (
                    <button
                        className="ml-4 px-2 py-1 bg-black text-white hover:bg-gray-800 rounded"
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? "Ẩn" : "Xem"}
                    </button>
                )}
                <button
                    className="ml-4 px-2 py-1 bg-black text-white hover:bg-gray-800 rounded"
                    onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
                            onDelete(category._id);
                        }
                    }}
                >
                    Xóa
                </button>
            </div>
            {expanded && children.length > 0 && (
                <ul className="ml-6 border-l border-gray-300 pl-4 mt-2">
                    {children.map((child) => (
                        <CategoryItem
                            key={child._id}
                            category={child}
                            categories={categories}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const Categories: React.FC = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery<CategoryResponse>({
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
    const rootCategories = categoriesData.filter((cat) => !cat.parentId);

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <AdminHeader />
            <div className="flex flex-1 overflow-hidden">
                <AdminMenu className="w-64 bg-black p-6" />
                <main className="flex-1 overflow-auto p-8 bg-white text-black">
                    <div className="flex-1 flex flex-col">
                        <AddCategoryForm />
                        <div className="max-w-4xl p-4">
                            <h2 className="text-2xl font-bold mb-4">Danh mục</h2>
                            {rootCategories.length > 0 ? (
                                <ul>
                                    {rootCategories.map((cat) => (
                                        <CategoryItem
                                            key={cat._id}
                                            category={cat}
                                            categories={categoriesData}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <div>Không có danh mục nào</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Categories;
