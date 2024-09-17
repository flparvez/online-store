"use client"

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useGetCategoriesQuery } from '@/store/services/CategoryApi';


const CategorySlides = () => {
  const {data} = useGetCategoriesQuery()

  return (
    <div>
  <Swiper
        // spaceBetween={30}
        centeredSlides={true}
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          540: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          968: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
         {data?.map((product) => (
           <SwiperSlide key={product._id}>
             
             <div className="w-full rounded overflow-hidden justify-center items-center  shadow   bg-white">
            <div className='text-center'>

           
      <img className="w-52 h-40 object-cover text-center " src={product.image} alt={product.title} />
      </div>
        <div className="font-bold text-xl text-center ">{product.title}</div>
       
     
    </div>
   
           </SwiperSlide>
         ))}
       </Swiper>

       
      </div>
  )
}

export default CategorySlides
