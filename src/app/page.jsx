"use client"
import CategorySlides from '@/components/CategorySlide'

import { LampDemo } from '@/components/LampSection'
import Navbar from '@/components/Navbar'
import SwiperSlides from '@/components/SwiperSlide'



import { useGetProductsQuery } from '@/store/services/prodcutApi'


import React from 'react'

const Home = () => {
 
  const {data} = useGetProductsQuery()
 
  return (
    <div>
      <div className='my-5'>
   <Navbar/>
 
   <div className="">
  {
  data && data.products.length > 0
            ? 
                <SwiperSlides
                
                  products= {data?.products}
                  
                />
              
            : null
            }
            </div>
            <div className='justify-center flex text-center'>
              <LampDemo />
            </div>
              </div>
              <div className='mx-auto '>
            <h2>Product Category</h2>
          <CategorySlides products={data?.products} />
    </div>
    </div>
  )
}

export default Home
