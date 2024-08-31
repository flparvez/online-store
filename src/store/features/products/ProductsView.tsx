"use client"
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import React from 'react'

const ProductsView = () => {
  const {data} = useGetProductsQuery();
  console.log(data)
  return (
    <div>
      <h2>List of product</h2>
    </div>
  )
}

export default ProductsView
