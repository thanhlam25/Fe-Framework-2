import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../types/categories";

const MenuClient = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Dữ liệu giả cho categories
        const fakeCategories: Category[] = [
            { _id: "1", name: "Nam" },
            { _id: "2", name: "Nữ" },
            { _id: "3", name: "Trẻ Trâu" },
        ];

        // Cập nhật state với dữ liệu giả
        setCategories(fakeCategories);
    }, []);

    return (
        <header className="grid grid-cols-[1fr_0.3fr_1fr] items-center py-5 bg-white fixed top-0 w-[90%] z-50 shadow-sm r-0">
            {/* Thẻ div bên trái chứa menu */}
            <div className="flex items-center justify-start">
                {categories.map((category) => (
                    <div key={category._id} className="relative group">
                        <Link to={`/category/${category._id}`} className="text-[12px] font-semibold text-gray-800 mr-4 hover:text-red-500 transition-all duration-300">
                            {category.name.toUpperCase()}
                        </Link>
                    </div>
                ))}
                <Link to="/sale" className="text-[12px] font-semibold text-[rgb(255,0,0)] mr-4">
                    THÁNG VÀNG SĂN SALE
                </Link>
                <Link to="/collection" className="text-[12px] font-semibold text-gray-800 mr-4 hover:text-red-500 transition-all duration-300">
                    BỘ SƯU TẬP
                </Link>
                <Link to="/about" className="text-[12px] font-semibold text-gray-800 hover:text-red-500 transition-all duration-300">
                    VỀ CHÚNG TÔI
                </Link>
            </div>

            {/* Thẻ div giữa chứa logo */}
            <div className="flex justify-center items-center">
                <Link to="/">
                    <img src="/public/images/logo.png" alt="Logo" className="w-32 h-auto" />
                </Link>
            </div>

            {/* Thẻ div bên phải chứa các icon */}
            <div className="flex items-center justify-end">
                <div className="w-80 h-9 border flex">
                    <div className="flex px-2 gap-4 items-center">
                        <Link to="/search">
                            <img src="/public/svg/search.svg" alt="" className="w-4 h-auto" />
                        </Link>
                        <input
                            type="text"
                            name="searchname"
                            id="searchname"
                            placeholder="TÌM KIẾM SẢN PHẨM"
                            className="text-xs p-0 outline-none border-0 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <Link to="/support" className="ml-4">
                    <img src="/public/svg/headphone.svg" alt="Headphone" className="w-5 h-auto" />
                </Link>
                <Link to="/login" className="ml-4">
                    <img src="/public/svg/user.svg" alt="User" className="w-5 h-auto" />
                </Link>
                <Link to="/cart" className="ml-4 mr-8">
                    <img src="/public/svg/cart.svg" alt="Cart" className="w-5 h-auto" />
                </Link>
            </div>
        </header>

    );
};

export default MenuClient;
