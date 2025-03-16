import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Autoplay } from 'swiper/modules';

// Nhận props cho Slideshow
type SlideshowProps = {
    images: string[]; // Danh sách hình ảnh
    spaceBetween?: number; // Khoảng cách giữa các slide
    slidesPerView?: number; // Số lượng slide hiển thị
    autoplayDelay?: number; // Thời gian delay khi autoplay
};

const Slideshow: React.FC<SlideshowProps> = ({
    images,
    spaceBetween = 50,
    slidesPerView = 1,
    autoplayDelay = 2500
}) => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
            }}
            loop={true}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img
                        className="rounded-tl-[80px] rounded-br-[80px]"
                        src={image}
                        alt={`Image ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slideshow;
