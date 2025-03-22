import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, addCategory } from "../../services/categoryService"; // Đường dẫn đến file service
import { Category } from "../../types/categories"; // Đường dẫn đến file types/categories

const AddCategoryForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [level, setLevel] = useState<number>(1);
    const [parentLevel1Id, setParentLevel1Id] = useState<string | null>(null);
    const [parentId, setParentId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const mutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            setName("");
            setParentLevel1Id(null);
            setParentId(null);
            setLevel(1);
        },
        onError: (error) => {
            console.error("Lỗi khi thêm danh mục:", error);
        },
    });
    if (isLoading) return <div>Đang tải danh mục...</div>;
    if (isError) return <div>Lỗi: {(error as Error).message}</div>;
    const categoriesData: Category[] = data?.docs || [];
    const level1Categories = categoriesData.filter((cat) => cat.level === 1);
    const level2Categories = parentLevel1Id
        ? categoriesData.filter((cat) => cat.level === 2 && cat.parentId === parentLevel1Id)
        : categoriesData.filter((cat) => cat.level === 2);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            alert("Vui lòng nhập tên danh mục");
            return;
        }
        if (level === 2 && !parentId) {
            alert("Vui lòng chọn danh mục cấp 1 làm cha");
            return;
        }
        if (level === 3 && (!parentLevel1Id || !parentId)) {
            alert("Vui lòng chọn đầy đủ danh mục cấp 1 và cấp 2 làm cha");
            return;
        }
        const newCategory = { name, parentId, level };
        mutation.mutate(newCategory);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Chọn cấp độ danh mục
                </label>
                <select
                    id="level"
                    value={level}
                    onChange={(e) => {
                        setLevel(Number(e.target.value));
                        setParentLevel1Id(null); // Reset khi đổi cấp độ
                        setParentId(null);
                    }}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value={1}>Cấp 1</option>
                    <option value={2}>Cấp 2</option>
                    <option value={3}>Cấp 3</option>
                </select>
            </div>
            {level === 2 && (
                <div>
                    <label htmlFor="parentLevel1" className="block text-sm font-medium text-gray-700">
                        Chọn danh mục cấp 1 (cha)
                    </label>
                    <select
                        id="parentLevel1"
                        value={parentId || ""}
                        onChange={(e) => setParentId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Chọn danh mục cấp 1</option>
                        {level1Categories.length > 0 ? (
                            level1Categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                Không có danh mục cấp 1
                            </option>
                        )}
                    </select>
                </div>
            )}

            {/* Chọn danh mục cha cho cấp 3 */}
            {level === 3 && (
                <>
                    <div>
                        <label htmlFor="parentLevel1" className="block text-sm font-medium text-gray-700">
                            Chọn danh mục cấp 1
                        </label>
                        <select
                            id="parentLevel1"
                            value={parentLevel1Id || ""}
                            onChange={(e) => {
                                setParentLevel1Id(e.target.value);
                                setParentId(null); // Reset parentId khi đổi cấp 1
                            }}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Chọn danh mục cấp 1</option>
                            {level1Categories.length > 0 ? (
                                level1Categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Không có danh mục cấp 1
                                </option>
                            )}
                        </select>
                    </div>

                    {parentLevel1Id && (
                        <div>
                            <label htmlFor="parentLevel2" className="block text-sm font-medium text-gray-700">
                                Chọn danh mục cấp 2 (cha)
                            </label>
                            <select
                                id="parentLevel2"
                                value={parentId || ""}
                                onChange={(e) => setParentId(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Chọn danh mục cấp 2</option>
                                {level2Categories.length > 0 ? (
                                    level2Categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Không có danh mục cấp 2
                                    </option>
                                )}
                            </select>
                        </div>
                    )}
                </>
            )}

            {/* Nhập tên danh mục */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Tên danh mục
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập tên danh mục"
                    required
                />
            </div>

            {/* Nút thêm danh mục */}
            <div>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {mutation.isPending ? "Đang thêm..." : "Thêm danh mục"}
                </button>
            </div>
        </form>
    );
};

export default AddCategoryForm;