"use client"
import CategorySlides from '@/components/CategorySlide'

import { LampDemo } from '@/components/LampSection'

import SwiperSlides from '@/components/SwiperSlide'



import { useGetProductsQuery } from '@/store/services/prodcutApi'


import React from 'react'

const Home = () => {
 
  const {data} = useGetProductsQuery()
//  console.log(data)
  return (
    <div>
      <div className='my-5'>

 
 {/* Featured Products And Category With Link */}
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
              {/* Category Slider With Link */}
              <div className='mx-auto '>
            <h2>Product Category</h2>
          <CategorySlides  />
    </div>

    {/* Product List Product Category Button */}
    <div>
      <div className='flex justify-center'>
        <button className='py-3 px-6 text-white bg-blue-600 rounded-md'>View All Product</button>
  
    </div>
    </div>

    {/* Product List Responsive Design */}
    <div>
      <h2>All Products</h2>
    </div>
    </div>
  )
}

export default Home
