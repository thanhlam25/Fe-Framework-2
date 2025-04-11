import React from 'react'
import { Link, useParams } from 'react-router-dom';
import MenuInfo from '../../components/menuInfo';
import Footer from '../../layouts/clientFooter';
import HeaderClient from '../../layouts/clientHeader';
import MenuClient from '../../layouts/clientMenu';
import { useQuery } from '@tanstack/react-query';
import { getById } from '../../api/provider';


const Detail_order = () => {
    const {id} = useParams();
    const {data, isLoading} = useQuery({
        queryKey:["orders",id],
        queryFn: ()=>getById({namespace:"orders",id : id})
    })
    console.log(data);
    if (!data) {
        return <div className="p-10 text-center text-red-500">Không tìm thấy đơn hàng.</div>;
      }
    return (
        <>
          <HeaderClient />
          <div className="mx-[5%]">
            <MenuClient />
            <article className="mt-[98px]">
              <div className="flex gap-4 my-4">
                <div className="text-sm">
                  <a href="?action=home">Trang chủ</a>
                </div>
                <div className="text-sm">-</div>
                <div className="text-sm">Tài khoản của tôi</div>
              </div>
            </article>
            <hr className="" />
            <div className="grid grid-cols-[0.6fr_2fr] pt-8 py-1  ">
              {/* Sidebar Menu */}
              <MenuInfo />
    
              {/* Main Content: Orders Table */}
              <div className="  p-4">
                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-semibold">
                    CHI TIẾT ĐƠN HÀNG <span className="text-red-600">IVM8601563</span>
                    </h2>
                    <button className="text-sm text-red-500 hover:underline">{data.status}</button>
                </div>

                <div className="flex flex-col lg:flex-row justify-between ">
                    {/* Left: Product info */}
                    <div className="grid grid-cols-1">
                    {data.items?.map((item:any,index:any)=>{
                        return(
                            <div className="flex-1">
                            <div className="flex gap-4">
                            <img
                                src={item.productVariantId.images.main.url}
                                alt="ddd"
                                className="w-[150px] h-[215px] object-cover"
                            />
                            <div className="flex flex-col justify-between">
                                <div key={index}>
                                <div className="flex justify-between gap-[200px]">
                                    <div className="font-semibold">{item.productName}</div>
                                    <div className="font-semibold">{item.price.toLocaleString("vi-VN")}</div>
                                </div>
                                <p className="text-sm text-gray-600 py-0.5">Màu sắc: {item.productVariantId.color.colorName}</p>
                                <p className="text-sm text-gray-600 py-0.5">Size: {item.size}</p>
                                <p className="text-sm text-gray-600 py-0.5">Số lượng: {item.quantity}</p>
                                <p className="text-sm text-gray-600 py-0.5">SKU: {item.productVariantId.sku}</p>
                                </div>
                                <button className="w-fit mt-2 px-4 py-1 border border-black rounded-md hover:bg-black hover:text-white transition">
                                MUA LẠI
                                </button>
                            </div>
                            </div>
                            <hr className="mt-2 w-[600px]" />
                        </div>
                        )})}
                    </div>
                    
                    

                    {/* Right: Summary */}
                    <div className="w-full lg:w-[320px] bg-gray-100 p-4 rounded-md space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Tóm tắt đơn hàng</h3>
                    <div className="text-sm space-y-1">
                        <div className="flex justify-between py-1">
                        <span>Ngày tạo đơn</span>
                        <span>
                            {new Date(data.updatedAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </span>

                        </div>
                        <div className="flex justify-between py-1">
                        <span>Tạm tính</span>
                        <span>{data.totalAmount.toLocaleString("vi-VN")} đ</span>
                        </div>
                        <div className="flex justify-between py-1">
                        <span>Phí vận chuyển</span>
                        <span>38.000 đ</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                        <span>Tổng tiền</span>
                        <span>
                        {(data.totalAmount + 38000).toLocaleString("vi-VN")} đ
                        </span>

                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mt-4 mb-1 border-t">Hình thức thanh toán</h4>
                        <p className="text-sm py-1">Thanh toán khi giao hàng</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mt-4 mb-1 border-t">Đơn vị vận chuyển</h4>
                        <p className="text-sm py-1">Chuyển phát nhanh</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mt-4 mb-1 border-t">Địa chỉ</h4>
                        <p className="text-sm py-1">Đinh Hoàng Thành Lâm</p>
                        <p className="text-sm py-1">đồng chanh, Phú Phụng, Chợ Lách, Bến Tre</p>
                        <p className="text-sm py-1">Điện thoại: 0845203210</p>
                    </div>
                    </div>
                </div>

      <div className="mt-8">
        <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition">
          THEO DÕI ĐƠN HÀNG
        </button>
      </div>
    </div>
            </div>
            <Footer />
          </div>
        </>
      );
}

export default Detail_order