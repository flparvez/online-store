"use client"
import  { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {  Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
SwiperCore.use([Navigation, Pagination, Autoplay]);
const SwiperSlides = ({products}) => {
  console.log("product",products?.name)
  return (
   <div>
 <Swiper
autoplay={{
  delay:3000,
  disableOnInteraction:false,
}} 
direction="horizontal"
loop={true}
speed={1300}
watchSlidesProgress={true}
parallax={true}
pagination={{clickable:true}}
      breakpoints={{
        640: { slidesPerView: 1 },
        540: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        968: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
           <div className="w-full max-w-sm mx-auto">
            <div className=" overflow-hidden">
            <img
            src={product.images}
            alt="text" 
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
            </div>
            <h3 className="text-xl font-bold mb-2 mt-2 text-center">{product.name}</h3>
            <p className="text-gray-500 mb-2 text-center">{product.category}</p>
            <p className="text-lg font-bold text-center">${product.price}</p>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
   </div>
  )
}

export default SwiperSlides
