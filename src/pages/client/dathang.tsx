import React, { useState } from "react";
import HeaderClient from "../../layouts/clientHeader";
import Footer from "../../layouts/clientFooter";
import MenuClient from "../../layouts/clientMenu";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartData, ICartItem } from "../../types/cart";
import { useAuth } from "../../components/context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";
import { getById, getList } from "../../api/provider";
import Loading from "../../components/loading";
import axiosInstance from "../../services/axiosInstance";

const Dathang = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const [showProducts, setShowProducts] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: cartItems, isLoading: cartLoading, error: cartError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getList({ namespace: `cart` }),
    staleTime: 60 * 1000,
  });

  const { data: userData, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['users', auth.user.id],
    queryFn: async () => getById({ namespace: `auth/shipping-address`, id: auth.user.id }),
    staleTime: 60 * 1000,
  });

  if (cartLoading || userLoading) return <Loading />;
  if (cartError) return <div>Lỗi khi tải giỏ hàng: {(cartError as Error).message}</div>;
  if (userError) return <div>Lỗi khi tải thông tin người dùng: {(userError as Error).message}</div>;
  if (!userData || userData.length === 0) return <div>Không tìm thấy thông tin địa chỉ giao hàng</div>;

  const address = userData[0].address + ", " + userData[0].district + ", " + userData[0].commune + ", " + userData[0].city;

  const items: ICartItem[] = cartItems?.items || [];
  const validItems = items.filter(
    (item) =>
      item &&
      item.productId &&
      typeof item.productId === "object" &&
      item.productId !== null
  );

  const totalQuantity = validItems.reduce((sum, item) => {
    if (!item || typeof item.quantity !== "number") return sum;
    return sum + item.quantity;
  }, 0);

  const totalPrice = validItems.reduce((sum, item) => {
    if (
      !item?.productId?.price ||
      typeof item.productId.price !== "number" ||
      !item.quantity
    )
      return sum;
    return sum + item.productId.price * item.quantity;
  }, 0);

  const handlePayment = async () => {
    if (!auth.user.id) {
      toast.error("Bạn cần đăng nhập để thực hiện thanh toán");
      return;
    }

    try {
      if (paymentMethod === "cod") {
        // Tạo payload cho đơn hàng COD
        const payload = {
          orderId: "COD_" + new Date().getTime(),
          user: {
            name: userData[0].receiver_name,
            email: auth.user.email,
            phone: userData[0].phone,
            address: address
          },
          items: validItems.map((item) => ({
            productId: item.productId._id,
            productName: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            size: item.size
          })),
          totalAmount: totalPrice,
          paymentMethod: "COD"
        };

        try {
          await axiosInstance.post("https://nodejs-ivymoda.fly.dev/api/orders", payload);
          toast.success("Đặt hàng thành công!");
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Thanh toán thất bại");
        }
      } else if (paymentMethod === "momo") {
        // Tạo payload cho đơn hàng MoMo
        const payload = {
          orderId: "MoMo_" + new Date().getTime(),
          user: {
            name: userData[0].receiver_name,
            email: auth.user.email,
            phone: userData[0].phone,
            address: address
          },
          items: validItems.map((item) => ({
            productId: item.productId._id,
            productName: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            size: item.size
          })),
          totalAmount: totalPrice,
          paymentMethod: "MoMo",
          orderInfo: "Thanh toán qua MoMo",
          extraData: "",
          orderGroupId: ""
        };

        try {
          // Tạo đơn hàng trước
          await axiosInstance.post("https://nodejs-ivymoda.fly.dev/api/orders", payload);

          // Tạo thanh toán MoMo với số tiền là số nguyên
          const momoResponse = await axiosInstance.post(
            "https://nodejs-ivymoda.fly.dev/api/orders/momo/create",
            {
              totalAmount: Math.round(totalPrice), // Đảm bảo số tiền là số nguyên
              orderId: payload.orderId,
              orderInfo: payload.orderInfo,
              extraData: payload.extraData,
              orderGroupId: payload.orderGroupId
            }
          );

          console.log("MoMo Response:", momoResponse.data); // Log response để debug

          if (!momoResponse.data || momoResponse.data.resultCode !== 0) {
            const errorMessage = momoResponse.data?.message || "Khởi tạo thanh toán MoMo thất bại";
            console.error("Lỗi MoMo:", momoResponse.data);
            throw new Error(errorMessage);
          }

          // Chuyển hướng đến trang thanh toán MoMo
          window.location.href = momoResponse.data.payUrl;
        } catch (error: any) {
          console.error("Lỗi thanh toán MoMo:", error);
          const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra khi thanh toán MoMo";
          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
      console.error("Lỗi thanh toán:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thanh toán");
    }
  };

  return (
    <>
      <HeaderClient />
      <div className="mx-[5%]">
        <MenuClient />
        <article className="mt-[100px]">
          <article className="grid grid-cols-[4fr_1.5fr] gap-10 mt-[100px]">
            <div>
              {/* Thanh tiến trình */}
              <div className="border w-full h-[96.6px] flex justify-center rounded-tl-[20px] rounded-br-[20px]">
                <div className="w-[14px] h-[14px] rounded-full border-2 border-[#e7e8e9] bg-black mt-6 z-10 relative">
                  <p className="text-[12px] mt-4 left-[-20px] w-16 absolute">
                    Giỏ hàng
                  </p>
                </div>
                <div className="h-[3px] w-[200px] bg-black mx-2 mt-[30px]"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-black border-2 border-[#e7e8e9] mt-6 z-10 relative">
                  <div className="text-[12px] mt-4 left-[-20px] w-16 absolute">
                    Đặt hàng
                  </div>
                </div>
                <div className="h-[3px] w-[200px] bg-[#e7e8e9] mx-2 mt-[30px]"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-white border-2 border-[#e7e8e9] mt-6 z-10 relative">
                  <div className="text-[12px] mt-4 left-[-20px] w-20 absolute">
                    Thanh toán
                  </div>
                </div>
                <div className="h-[3px] w-[200px] bg-[#e7e8e9] mx-2 mt-[30px]"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-white border-2 border-[#e7e8e9] mt-6 z-10 relative">
                  <div className="text-[12px] mt-4 left-[-40px] w-28 absolute">
                    Hoàn thành đơn
                  </div>
                </div>
              </div>

              {/* Nội dung đặt hàng */}
              <div className="grid grid-cols-[1.5fr_1.25fr] gap-10">
                <div>
                  <div className="text-[20px] font-semibold py-6">
                    Địa chỉ giao hàng
                  </div>
                  <div className="border p-6 rounded-tl-[28px] rounded-br-[28px]">
                    <div className="flex justify-between">
                      <div className="text-base font-semibold">{userData[0].receiver_name}</div>
                      <div className="flex gap-4">
                        <div className="text-[14px] underline">Chọn địa chỉ khác</div>
                        <div>
                          <a
                            className="py-[10px] px-[16px] border border-black text-white bg-black rounded-tl-[20px] rounded-br-[20px] mt-8 hover:text-black hover:bg-white"
                            href=""
                          >
                            Mặc định
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 text-[14px]">Điện thoại: {userData[0].phone}</div>
                    <div className="py-2 text-[14px]">
                      Địa chỉ: {address}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[20px] font-semibold py-6">
                    Phương thức thanh toán
                  </div>
                  <div className="border p-8 rounded-tl-[25px] rounded-br-[25px]">
                    <div className="flex flex-col gap-4 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-[14px] font-semibold">
                          Thanh toán khi nhận hàng
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="momo"
                          checked={paymentMethod === "momo"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-[14px] font-semibold">
                          Thanh toán MoMo
                        </span>
                      </label>
                    </div>
                    <div className="text-xs mt-4 w-full">
                      Thời gian giao hàng dự kiến:{" "}
                      {new Date(
                        Date.now() + 3 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("vi-VN", {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4 pt-6">
                <button
                  onClick={() => setShowProducts(!showProducts)}
                  className="py-1 px-4 text-sm border border-black rounded-tl-[15px] rounded-br-[15px] hover:bg-black hover:text-white transition-all duration-300"
                >
                  {showProducts ? "Ẩn sản phẩm" : "Hiển thị sản phẩm"}
                </button>
              </div>

              {showProducts && (
                <div>
                  <table className="w-full bg-white table-auto border-collapse">
                    <thead className="border-b bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Sản phẩm
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Số lượng
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Size
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Tổng tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {validItems.length > 0 ? (
                        validItems.map((item: ICartItem, index: number) => (
                          <tr
                            key={item._id}
                            className={`border-b hover:bg-gray-50 ${index % 2 === 1 ? "bg-gray-100" : ""
                              }`}
                          >
                            <td className="px-4 py-2 text-sm text-gray-700">
                              <div className="flex items-center gap-4">
                                <Link
                                  to={`/products/${encodeURIComponent(
                                    item?.productId?._id || ""
                                  )}`}
                                  className="group relative block"
                                >
                                  <img
                                    src={
                                      item?.productId?.images?.main ||
                                      "/fallback.jpg"
                                    }
                                    alt={
                                      item?.productId?.name || "Product"
                                    }
                                    className="w-28 h-[140px] object-cover rounded transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                                    onError={(e) =>
                                      (e.currentTarget.src = "/fallback.jpg")
                                    }
                                  />
                                  <img
                                    src={
                                      item?.productId?.images?.hover ||
                                      "/fallback.jpg"
                                    }
                                    alt={
                                      item?.productId?.name || "Product"
                                    }
                                    className="w-28 h-[140px] object-cover rounded absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                                    onError={(e) =>
                                      (e.currentTarget.src = "/fallback.jpg")
                                    }
                                  />
                                </Link>
                                <Link
                                  to={`/products/${encodeURIComponent(
                                    item?.productId?._id || ""
                                  )}`}
                                  className="hover:text-orange-600 transition-all duration-300"
                                >
                                  {item?.productId?.name || "Unnamed Product"}
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              <div className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-[5.5rem] h-8 my-4">
                                  <div
                                    id={`quantityDisplay-${item._id}`}
                                    className="flex items-center justify-center text-center text-sm border border-gray-300 w-12 h-full z-10 rounded-tl-[20px] rounded-br-[20px]"
                                  >
                                    {item.quantity}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {item.size}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {(
                                (item?.productId?.price || 0) *
                                (item?.quantity || 0)
                              ).toLocaleString("vi-VN")}{" "}
                              đ
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-2 text-center text-gray-500"
                          >
                            Giỏ hàng của bạn trống.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div>
              <div className="bg-[#fbfbfc] p-[22px] w-[400px]">
                <div className="text-[20px] text-[#221F20]">
                  Tóm tắt đơn hàng
                </div>
                <br />
                <div className="text-[14px] text-[#57585A]">
                  <div className="flex justify-between">
                    <div>Tổng sản phẩm</div>
                    <div>{totalQuantity}</div>
                  </div>
                </div>
                <br />
                <div className="text-[14px] text-[#57585A]">
                  <div className="flex justify-between">
                    <div>Tổng tiền hàng</div>
                    <div>{totalPrice.toLocaleString("vi-VN")} đ</div>
                  </div>
                </div>
                <br />
                <div className="text-[14px] text-[#57585A]">
                  <div className="flex justify-between">
                    <div>Phí vận chuyển</div>
                    <div>Miễn phí</div>
                  </div>
                </div>
                <br />
                <div className="text-[14px] text-[#57585A]">
                  <div className="flex justify-between">
                    <div>Tiền thanh toán</div>
                    <div className="font-semibold">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div>
                <button
                  onClick={handlePayment}
                  className={`bg-black w-full h-[50px] rounded-tl-2xl rounded-br-2xl flex items-center justify-center lg:text-[16px] md:text-[12px] text-white font-semibold ${validItems.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer"
                    } transition-all duration-300`}
                >
                  {validItems.length === 0 ? "GIỎ HÀNG TRỐNG" : "THANH TOÁN"}
                </button>
              </div>
            </div>
          </article>
        </article>
        <Footer />
      </div>
    </>
  );
};

export default Dathang;
