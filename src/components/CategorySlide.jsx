"use client"


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useGetCategoriesQuery } from '@/store/services/CategoryApi';


const CategorySlides = () => {
  const {data} = useGetCategoriesQuery()

  return (
    <div>
    <Swiper
   autoplay={true}
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
