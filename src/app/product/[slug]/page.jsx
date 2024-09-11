"use client"
import React, { useEffect, useState } from 'react'

const ProductPage =({ params }) => {
  const [product, setProduct] = useState(null)
 
  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(`/api/product/${params.slug}`)
      let data = await res.json()
      setProduct(data.product)
    }
    fetchPosts()
  }, [])
  // console.log(product)
 
  if (!product) return <div>Loading...</div>
 
  return (
    <div>
      <h2>{product?.name}</h2>
    </div>
  )
}

export default ProductPage
