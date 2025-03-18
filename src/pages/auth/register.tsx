import React from "react";
import HeaderClient from "../../layouts/clientHeader";
import MenuClient from "../../layouts/clientMenu";
import Footer from "../../components/clientFooter";

const Register = () => {
    return (
        <>
            <HeaderClient />
            <div className="mx-[5%]">
                <MenuClient />
                <article className="mt-[82px]">
                    <div className="flex justify-center">
                        <p className="font-semibold text-2xl pt-4">ĐĂNG KÝ</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <p className="font-[500] text-[1rem] py-4">Thông tin khách hàng</p>
                            <form id="registerForm">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p>Họ: <span className="text-red-500">*</span></p>
                                        <input type="text" placeholder="Họ.." className="border w-full h-11 p-4" />
                                    </div>
                                    <div>
                                        <p>Tên: <span className="text-red-500">*</span></p>
                                        <input type="text" placeholder="Tên.." className="border w-full h-11 p-4" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p>Email: <span className="text-red-500">*</span></p>
                                        <input type="email" placeholder="Email.." className="border w-full h-11 p-4" />
                                    </div>
                                    <div>
                                        <p>Điện thoại: <span className="text-red-500">*</span></p>
                                        <input type="text" placeholder="Điện thoại.." className="border w-full h-11 p-4" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p>Ngày sinh: <span className="text-red-500">*</span></p>
                                        <input type="date" className="border w-full h-11 p-4" />
                                    </div>
                                    <div>
                                        <p>Giới tính: <span className="text-red-500">*</span></p>
                                        <select className="border w-full h-11 p-4">
                                            <option value="1">Nam</option>
                                            <option value="2">Nữ</option>
                                            <option value="3">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p>Tỉnh/TP: <span className="text-red-500">*</span></p>
                                        <select className="border w-full h-11 p-4">
                                            <option value="">Chọn tỉnh thành</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p>Quận/Huyện: <span className="text-red-500">*</span></p>
                                        <select className="border w-full h-11 p-4">
                                            <option value="">Chọn quận huyện</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p>Phường/Xã: <span className="text-red-500">*</span></p>
                                    <select className="border w-full h-11 p-4">
                                        <option value="">Chọn phường xã</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Địa chỉ: <span className="text-red-500">*</span></p>
                                    <input type="text" placeholder="Địa chỉ.." className="border w-full h-[80px] p-4" />
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[500] text-[1rem] py-4">Thông tin mật khẩu</p>
                            <div>
                                <p>Mật khẩu: <span className="text-red-500">*</span></p>
                                <input type="password" placeholder="Mật khẩu.." className="border w-full h-11 p-4" />
                            </div>
                            <div>
                                <p>Nhập lại mật khẩu: <span className="text-red-500">*</span></p>
                                <input type="password" placeholder="Nhập lại mật khẩu.." className="border w-full h-11 p-4" />
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" disabled checked />
                                <p className="text-[14px]">Đồng ý với các <a href="#" className="text-red-500">điều khoản</a> của IVY</p>
                            </div>
                            <div className="flex items-center mt-4">
                                <input type="checkbox" className="mr-2" />
                                <p className="text-[14px]">Đăng ký nhận bản tin</p>
                            </div>
                            <div className="mt-6">
                                <button className="border border-black text-white font-semibold text-lg bg-black w-full p-3 rounded-br-2xl rounded-tl-2xl cursor-pointer hover:bg-white hover:text-black">Đăng Ký</button>
                                <a href="?action=showFormlogin" className="border border-black text-black font-semibold text-lg bg-white w-full p-3 mt-4 block text-center rounded-br-2xl rounded-tl-2xl hover:bg-black hover:text-white">Quay lại trang đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </article>
                <Footer />
            </div>
        </>
    );
};

export default Register;
