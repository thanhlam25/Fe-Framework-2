import React, { useState, useEffect, useRef } from 'react';
import { getProducts } from '../services/productService'; // Đảm bảo getProducts nhận endpoint
import { IProduct } from '../types/products'; // Import interface từ types/products.ts
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Autoplay } from 'swiper/modules';

interface ProductItemFormProps {
    endpoint: string;
}

const ProductItemForm: React.FC<ProductItemFormProps> = ({ endpoint }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const swiperRef = useRef<any>(null); // Tham chiếu đến Swiper

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts(endpoint);
                setProducts(res); // Giả sử res là mảng sản phẩm
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [endpoint]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.autoplay.start(); // Bắt đầu autoplay khi Swiper đã được khởi tạo
        }
    }, [products]); // Kích hoạt autoplay khi danh sách sản phẩm đã được load

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
                speed={3000}
                modules={[Autoplay]}
               
                ref={swiperRef}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id} className="relative">
                        <a
                            href={`?action=product&id=${encodeURIComponent(product._id)}`}
                            className="group relative block w-full"
                        >
                            <img
                                src={product.images.main}
                                alt="Main Image"
                                className="w-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                            />
                            <img
                                src={product.images.hover}
                                alt="Hover Image"
                                className="w-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                            />
                        </a>
                        <div className="flex gap-2 py-2 justify-between items-center">
                            <div className="flex gap-2 py-2">
                                {Array.isArray(product.colors) && product.colors.length > 0 ? (
                                    product.colors.map((color) => (
                                        <a
                                            href={`?action=product&id=${encodeURIComponent(color._id)}`}
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
                                    <div>No colors available</div> // Thông báo nếu không có màu
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
                        <div>
                            <div className="w-8 h-8 bg-black hover:bg-white border border-transparent hover:border-black rounded-tl-[10px] rounded-br-[10px] absolute right-0 bottom-0 flex items-center justify-center transition-all duration-300 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    className="w-4 h-4 fill-current text-white group-hover:text-black transition-all duration-300"
                                >
                                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
                                </svg>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductItemForm;
