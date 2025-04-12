import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import { getById } from "../../api/provider";
import { addToCart } from "../../services/userService";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import { CartItem } from "../../types/cart";
import ClientLayout from "../../layouts/clientLayout";
import { IProductVariant } from "../../types/productVariant";

// Custom interface to match the actual data structure
interface ProductVariantWithDetails extends Omit<IProductVariant, "productId"> {
  productId: {
    _id: string;
    name: string;
    categoryId: string;
    shortDescription?: string;
    description?: string;
    sku: string;
    createdAt: string;
    updatedAt: string;
  };
}

const DetailProduct = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-variants", productId],
    queryFn: () => getById({ namespace: "product-variants/", id: productId }),
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("gioi_thieu");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product) {
      // Set the color to the current product's color
      setSelectedColor(product.color.colorName);

      // Set active image to main image
      setActiveImage(product.images.main.url);

      // Set the first available size
      const firstAvailableSize = product.sizes.find(
        (size: { stock: number }) => size.stock > 0
      );
      if (firstAvailableSize) {
        setSelectedSize(firstAvailableSize.size);
      } else {
        setSelectedSize(null);
      }
    }
  }, [product]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
      toast.success("Thêm vào giỏ hàng thành công");
    },
    onError: (error: Error) => {
      console.error("Lỗi từ server:", error.message);
      toast.error("Lỗi khi thêm sản phẩm");
    },
  });

  const handleQuantityChange = (change: number) => {
    const selectedSizeStock =
      product?.sizes.find(
        (s: { size: string | null }) => s.size === selectedSize
      )?.stock || Infinity;
    setQuantity((prev) => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > selectedSizeStock) return selectedSizeStock;
      return newQuantity;
    });
  };

  const isOutOfStock =
    product?.sizes.every((size: { stock: number }) => size.stock === 0) ||
    false;

  const changeMainImage = (imgUrl: string) => {
    setActiveImage(imgUrl);
  };

  const getAllProductImages = () => {
    if (!product) return [];
    return [
      product.images.main?.url,
      product.images.hover?.url,
      ...product.images.product.map((img: any) => img.url),
    ].filter(Boolean); // Filter out any undefined/null images
  };

  if (isLoading) return <Loading />;
  if (error)
    return <div>Error loading product: {(error as Error).message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ClientLayout>
      <article className="mt-[98px] px-4 md:px-6 lg:px-8">
        {/* Breadcrumb - Responsive */}
        <div className="flex flex-wrap gap-2 md:gap-4 my-4 text-xs md:text-sm">
          <a href="?action=home">Trang chủ</a>
          <div>-</div>
          <div>Danh mục cha</div>
          <div>-</div>
          <div>Danh mục con</div>
        </div>
        <hr className="mb-4 md:mb-8" />

        {/* Product Details - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images - Left Column */}
          <div className="w-full flex flex-col md:flex-row gap-3">
            {/* Main Image */}
            <div className="order-1 md:order-2 w-full md:w-4/5 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden mb-4 md:mb-0">
              <img
                id="mainImage"
                src={activeImage || product.images.main.url}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                alt={product.productId.name}
              />
            </div>

            {/* Thumbnails - Horizontal on mobile, vertical on desktop */}
            <div className="order-2 md:order-1 w-full md:w-1/5 overflow-x-auto md:overflow-y-auto md:h-[500px] lg:h-[600px]">
              <div className="flex md:flex-col gap-2 md:gap-4 pb-2 md:pb-0">
                {getAllProductImages().map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`w-20 h-20 md:w-full md:h-24 lg:h-28 object-cover cursor-pointer ${
                      activeImage === img ? "border-2 border-black" : ""
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => changeMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info - Right Column */}
          <div className="w-full">
            <div className="text-xl md:text-2xl lg:text-3xl font-medium">
              {product.productId.name}
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 py-3">
              <div className="text-gray-500 text-sm">SKU: {product.sku}</div>
              <div className="flex items-center gap-1">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={2.5}
                  className="text-yellow-500 flex items-center justify-center [&_.ant-rate-star]:!text-[14px] md:[&_.ant-rate-star]:!text-[16px]"
                />
                <div className="text-gray-500 text-xs md:text-sm">
                  (0 đánh giá)
                </div>
              </div>
            </div>

            <div className="text-xl md:text-2xl font-medium">
              {product.price.toLocaleString("vi-VN")}đ
            </div>

            {/* Product Colors */}
            <div className="text-lg font-medium my-4">
              Màu sắc: {product.color.colorName}
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="rounded-full w-5 h-5 relative flex items-center justify-center border border-gray-300"
                style={{ backgroundColor: product.color.actualColor }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-3 h-3 fill-current ${
                    product.color.actualColor === "#fafafa"
                      ? "text-gray-400"
                      : "text-white"
                  }`}
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
            </div>

            {/* Product Sizes */}
            <div className="flex flex-wrap gap-2 md:gap-4 my-4">
              {product.sizes.map(
                (item: {
                  _id: React.Key | null;
                  stock: number;
                  size: string;
                }) => (
                  <div
                    key={item._id}
                    className={`border border-black w-[40px] md:w-[46px] h-[30px] flex items-center justify-center text-black ${
                      item.stock === 0
                        ? "line-through cursor-not-allowed opacity-50 bg-gray-100"
                        : "cursor-pointer hover:bg-gray-100"
                    } ${selectedSize === item.size ? "bg-gray-200" : ""}`}
                    onClick={() =>
                      item.stock > 0 && setSelectedSize(String(item.size))
                    }
                  >
                    {item.size}
                  </div>
                )
              )}
            </div>

            <div className="text-xs flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-3 h-3 text-gray-500"
              >
                <path d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z" />
              </svg>
              <span className="ml-1">Kiểm tra size của bạn</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="font-medium text-gray-600">Số lượng</div>
              <div className="flex items-center justify-center gap-0.5 relative w-32 h-10 md:w-36 md:h-12">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="flex items-center justify-center border w-10 h-10 md:w-12 md:h-12 rounded rounded-tl-[15px] rounded-br-[15px] text-xl absolute left-0"
                >
                  -
                </button>
                <div className="flex items-center justify-center text-center text-sm border-y w-16 md:w-20 h-full z-10 absolute left-1/2 transform -translate-x-1/2">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="flex items-center justify-center border w-10 h-10 md:w-12 md:h-12 rounded rounded-tl-[15px] rounded-br-[15px] text-xl absolute right-0"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-8 md:mb-20 w-full">
              <div
                className={`my-2 text-base md:text-lg font-semibold w-full h-[46px] md:h-[48px] rounded-tl-[15px] rounded-br-[15px] flex justify-center items-center transition-all duration-300 ${
                  isOutOfStock
                    ? "bg-gray-400 text-white opacity-50 pointer-events-none"
                    : "bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer"
                }`}
                onClick={() => {
                  if (!isOutOfStock && selectedSize) {
                    if (!auth.user.id) {
                      toast.error("Bạn cần đăng nhập!");
                      return;
                    }
                    const cartItem: CartItem = {
                      userId: auth.user.id,
                      productVariantId: product._id,
                      size: selectedSize,
                      quantity: quantity,
                    };
                    addToCartMutation.mutate(cartItem);
                  } else if (!selectedSize) {
                    toast.error("Vui lòng chọn size!");
                  }
                }}
              >
                {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}
              </div>

              <div className="flex w-full">
                <div
                  className={`my-2 text-base md:text-lg font-semibold flex-grow h-[46px] rounded-tl-[15px] rounded-br-[15px] flex justify-center items-center transition-all duration-300 mr-3 ${
                    isOutOfStock
                      ? "bg-white text-gray-400 border border-gray-400 opacity-50 pointer-events-none"
                      : "bg-white text-black border border-black hover:bg-black hover:text-white cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isOutOfStock && selectedSize) {
                      if (!auth.user.id) {
                        toast.error("Bạn cần đăng nhập!");
                        return;
                      }
                      const cartItem: CartItem = {
                        userId: auth.user.id,
                        productVariantId: product._id,
                        size: selectedSize,
                        quantity: quantity,
                      };
                      addToCartMutation.mutate(cartItem);
                      navigate("/cart");
                    } else if (!selectedSize) {
                      toast.error("Vui lòng chọn size!");
                    }
                  }}
                >
                  {isOutOfStock ? "Hết hàng" : "Mua hàng"}
                </div>

                <div className="bg-white my-2 text-lg font-semibold text-black border border-black w-[46px] h-[46px] rounded-tl-[15px] rounded-br-[15px] flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 transition-all duration-300 group-hover:fill-white group-hover:scale-110"
                  >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Product Tabs - Responsive */}
            <div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div
                  className={`tab-button text-xs font-semibold mt-4 md:mt-10 mb-3 md:mb-5 cursor-pointer px-2 py-1 ${
                    activeTab === "gioi_thieu"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange("gioi_thieu")}
                >
                  GIỚI THIỆU
                </div>
                <div
                  className={`tab-button text-xs font-semibold mt-4 md:mt-10 mb-3 md:mb-5 cursor-pointer px-2 py-1 ${
                    activeTab === "chi_tiet"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange("chi_tiet")}
                >
                  CHI TIẾT SẢN PHẨM
                </div>
                <div
                  className={`tab-button text-xs font-semibold mt-4 md:mt-10 mb-3 md:mb-5 cursor-pointer px-2 py-1 ${
                    activeTab === "bao_quan"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange("bao_quan")}
                >
                  BẢO QUẢN
                </div>
              </div>
              <hr className="mb-4" />
              <div
                className={`tab-content text-[14px] leading-6 ${
                  activeTab === "gioi_thieu" ? "" : "hidden"
                }`}
              >
                {product.productId.shortDescription ||
                  "Mô tả ngắn về sản phẩm."}
              </div>
              <div
                className={`tab-content text-[14px] leading-6 ${
                  activeTab === "chi_tiet" ? "" : "hidden"
                }`}
              >
                {product.productId.description ||
                  "Mô tả chi tiết của sản phẩm."}
              </div>
              <div
                className={`tab-content text-[14px] leading-6 ${
                  activeTab === "bao_quan" ? "" : "hidden"
                }`}
              >
                Hướng dẫn bảo quản: Chỉ giặt khô, không giặt ướt.
              </div>
            </div>
          </div>
        </div>

        {/* Banner - Responsive */}
        <div className="mt-8 mb-4">
          <img
            src="/images/banner1.3.webp"
            className="w-full rounded-tl-[40px] md:rounded-tl-[80px] rounded-br-[40px] md:rounded-br-[80px]"
            alt="Banner"
          />
        </div>
      </article>
    </ClientLayout>
  );
};

export default DetailProduct;
