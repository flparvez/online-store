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
import Image from 'next/image';


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

<div className="container mx-auto px-4 py-8">
<div className="flex overflow-x-scroll scrollbar-hide">
         {data?.map((category) => (
       
             
             <SwiperSlide key={category._id}>
         <div className="flex-shrink-0 w-48 h-48 m-2 bg-white rounded-lg shadow-md overflow-hidden">
      <Image width={300} height={128} src={category.image} alt={category.title} className="w-full h-32 object-cover" />
      <div className="p-2">
        <h3 className="text-lg font-semibold text-center">{category.title}</h3>
      </div>
    </div>

        </SwiperSlide>
         ))}
         </div>
         </div>
       </Swiper>

       
      </div>
  )
}

export default CategorySlides
