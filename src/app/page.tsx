"use client"
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import ProductsView from '@/store/features/products/ProductsView'
import { useGetCategoriesQuery } from '@/store/services/CategoryApi'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import { useGetSingleUserQuery, useGetUsersQuery } from '@/store/services/UserApi'

import React from 'react'

const Home = () => {
  // const res = useGetCategoriesQuery()
  const {data} = useGetSingleUserQuery()
  if (data) {
    console.log(data.data._id)
  }
  return (
    <div>
   <Navbar/>
   <Header/>
      {/* <ProductsView /> */}
    </div>
  )
}

export default Home
