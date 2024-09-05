"use client"
import CategorySlides from '@/components/CategorySlide'
import Header from '@/components/Header'
import { LampDemo } from '@/components/LampSection'
import Navbar from '@/components/Navbar'
import SwiperSlides from '@/components/SwiperSlide'
import { Vortex } from '@/components/ui/vortex'


import { useGetCategoriesQuery } from '@/store/services/CategoryApi'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import { useGetSingleUserQuery, useGetUsersQuery } from '@/store/services/UserApi'

import React from 'react'

const Home = () => {
  // const res = useGetCategoriesQuery()
  // const {data} = useGetSingleUserQuery()
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
