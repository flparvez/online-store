"use client"
import CategorySlides from '@/components/CategorySlide'

import SwiperSlides from '@/components/SwiperSlide'
import { useGetProductsQuery } from '@/store/services/prodcutApi'

import ProductList from '@/components/ProductList'
import React from 'react'


const Home = () => {
 
  const {data} = useGetProductsQuery()
  const products = data?.products;
//  console.log(data)
  return (
    <div>
      <div className='p-2'>
      <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
 
 {/* Featured Products And Category With Link */}
   <div className="">
  {
  products && products.length > 0
            ? 
                <SwiperSlides
                
                  products= {products}
                  
                />
              
            : null
            }
            </div>
           
              </div>
              {/* Category Slider With Link */}
              <div className='mx-auto '>
              <div className='flex justify-center mb-8'>
              <button className='py-3 px-6 mt-14 text-white bg-blue-500  rounded-md'>Product Category</button>
  
    </div>
             

          <CategorySlides  />
    </div>

    {/* Product List Product Category Button */}
    <div>
      <div className='flex justify-center'>
        <button className='py-3 px-6 mt-14 text-white bg-blue-600 rounded-md'>View All Product</button>
  
    </div>
    </div>

    {/* Product List Responsive Design */}
    <section className="py-8">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
        <ProductList key={product.id} product={product} />
      
 ))}
          </div>
        </div>
      </section>
      

    
    
    </div>
  )
}

export default Home
