import React from "react";

const Footer = () => {
    return (
        <footer className="w-full px-0 mx-0">
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-12 mt-12 mb-4">
                <div className="col-span-1">
                    <div className="flex justify-between items-center">
                        <img src="/images/logo.png" alt="Logo" className="w-28 h-auto mr-4" />
                        <img src="/images/dmca.png" alt="DMCA" className="w-15 h-5 mr-4" />
                        <img src="/images/congthuong.png" alt="Cong Thuong" className="w-15 h-8" />
                    </div>
                    <div className="grid grid-cols-5 py-5 items-center">
                        {['ic_fb', 'ic_gg', 'ic_instagram', 'ic_pinterest', 'ic_ytb'].map((icon) => (
                            <img
                                key={icon}
                                src={`/svg/${icon}.svg`}
                                className="w-6 h-6 mx-auto" // Đảm bảo chiều rộng và chiều cao bằng nhau
                                alt={icon}
                            />
                        ))}
                    </div>

                    <div>
                        <p className="bg-black w-68 h-[50px] rounded-tl-2xl rounded-br-2xl flex items-center justify-center text-white font-semibold hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer transition-all duration-300">
                            HOTLINE: 0353 608 533
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-[2fr_3fr_1fr] gap-4">
                    <div>
                        <p className="font-semibold text-2xl pb-2">Giới thiệu</p>
                        <p className="py-2"><a className="font-[300] text-sm hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Về IVY moda</a></p>
                        <p className="py-2"><a className="font-[300] text-sm hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Tuyển dụng</a></p>
                        <p className="py-2"><a className="font-[300] text-sm hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Hệ Thống cửa hàng</a></p>
                    </div>
                    <div>
                        <p className="font-semibold text-2xl pb-2">Dịch vụ khách hàng</p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=dieukhoan">Chính sách điều khoản</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=huongdanmuahang">Hướng dẫn mua hàng</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=chinhsachthanhtoan">Chính sách thanh toán</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=chinhsachdoitra">Chính sách đổi trả</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=chinhsachbaohanh">Chính sách bảo hành</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=chinhsachvanchuyen">Chính sách giao nhận vận chuyển</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=chinhsachthethanhvien">Chính sách thẻ thành viên</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="?action=qanda">Q&A</a></p>
                    </div>
                    <div>
                        <p className="font-semibold text-2xl pb-2">Liên hệ</p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Hotline</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Email</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Live chat</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Messenger</a></p>
                        <p className="py-2"><a className="text-sm font-[300] hover:text-orange-600 transition-all duration-300 cursor-pointer" href="#">Liên hệ</a></p>
                    </div>
                </div>
                <div>
                    <div className="border-[4px] border-[#9999]-500 p-4 rounded-tl-[45px] rounded-br-[45px]">
                        <p className="font-[600] text-xl pt-2 pr-4 pb-4">Nhận thông tin các chương trình của IVY moda</p>
                        <div className="flex pb-4 w-full">
                            <div className="w-full border-b flex  items-center">
                                <p className="text-[12px] text-gray-500">Nhập địa chỉ email</p>
                            </div>

                            <div>
                                <a className="border border-black rounded-tl-[15px] rounded-br-[15px] w-24 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300" href="#">
                                    <button>Đăng ký</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl font-semibold py-4">Download App</div>
                    <img src="/images/appstore.png" className="w-42 h-auto pb-2" alt="Appstore" />
                    <img src="/images/googleplay.png" className="w-42 h-auto pt-2" alt="Google Play" />
                </div>
            </div>
            <hr />
            <div className="flex justify-center items-center h-16">
                <p>©IVYmoda All rights reserved - Nhóm 1</p>
            </div>
        </footer>
    );
};

export default Footer;
