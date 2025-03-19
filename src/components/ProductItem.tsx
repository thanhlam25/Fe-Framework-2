import React from 'react';
import { getProducts } from '../services/productService';
import { IProduct } from '../types/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';

interface ProductItemFormProps {
    endpoint: string;
}
const ProductItemForm: React.FC<ProductItemFormProps> = ({ endpoint }) => {
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products', endpoint],
        queryFn: async () => await getProducts(endpoint),
        staleTime: 60 * 1000,
    });
    const skeletons = Array(5).fill(null);

    return (
        <div className="mb-8">
            <Swiper
                spaceBetween={30}
                slidesPerView={5}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                speed={7000}
                modules={[Autoplay]}
            >
                {isLoading
                    ? skeletons.map((_, index) => (
                        <SwiperSlide key={index} className="relative">
                            <div className="group relative block w-full animate-pulse">
                                {/* Ảnh sản phẩm (màu xám) */}
                                <div className="w-full h-48 bg-gray-200 rounded"></div>
                                {/* Hiệu ứng hover ảnh */}
                                <div className="w-full h-48 bg-gray-100 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex gap-2 py-2 justify-between items-center">
                                <div className="flex gap-2 py-2">
                                    {/* Màu sắc sản phẩm (giả lập) */}
                                    {Array(3)
                                        .fill(null)
                                        .map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-full w-4 h-4 bg-gray-200"
                                            ></div>
                                        ))}
                                </div>
                            </div>
                            {/* Tên sản phẩm (màu xám) */}
                            <div className="w-3/4 h-4 bg-gray-200 rounded my-2"></div>
                            {/* Giá sản phẩm (màu xám) */}
                            <div className="w-1/2 h-5 bg-gray-200 rounded mt-2"></div>
                        </SwiperSlide>
                    ))
                    : products.map((product: IProduct) => (
                        <SwiperSlide key={product._id} className="relative">
                            <a
                                href={`/products/products/${encodeURIComponent(product._id)}`}
                                className="group relative block w-full"
                            >
                                <img
                                    src={product.images.main}
                                    alt={product.name}
                                    className="w-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                                />
                                <img
                                    src={product.images.hover}
                                    alt={product.name}
                                    className="w-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                                />
                            </a>
                            <div className="flex gap-2 py-2 justify-between items-center">
                                <div className="flex gap-2 py-2">
                                    {Array.isArray(product.colors) && product.colors.length > 0 ? (
                                        product.colors.map((color) => (
                                            <a
                                                href={`?action=product&id=${encodeURIComponent(color._id!)}`}
                                                className="block"
                                                key={color._id}
                                            >
                                                <div
                                                    className="rounded-full w-4 h-4 relative flex items-center justify-center"
                                                    style={{ backgroundColor: color.actualColor }}
                                                ></div>
                                            </a>
                                        ))
                                    ) : (
                                        <div>No colors available</div>
                                    )}
                                </div>
                            </div>
                            <a
                                href={`?action=product&id=${encodeURIComponent(product._id)}`}
                                className="text-sm block hover:text-red-500"
                            >
                                {product.name}
                            </a>
                            <div className="font-semibold pt-4">{product.price.toLocaleString()}đ</div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};  // Kiểm tra giá trị API_URL

export default ProductItemForm;
