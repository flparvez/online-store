"use client"

import { useEditProductMutation } from '@/store/services/prodcutApi';
import React, { useEffect, useState } from 'react'

const EditPage = ({params}) => {
  
  const [product, setProduct] = useState(null)
  const [updatedProduct, setUpdatedProduct] = useState(product);
  useEffect(() => {
    async function fetchPosts() {
      
      let res = await fetch(`/api/product/${params.slug}`)
      let data = await res.json()
 setProduct(data?.product)
    }
    fetchPosts()
  }, [params.slug])

 
  if (!product) return <div>Loading...</div>



  
  // const [updateProduct, { data, error, isLoading }] =
  // useEditProductMutation();


  console.log(product)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id: product._id, updatedProduct: updatedProduct });
      onClose();
    } catch (err) {
      console.error('Failed to update the product: ', err);
    }
  };


  return (
    <div>
      <h2>Edit Product</h2>
      <h2>{product.name}</h2>
    {/* <form onSubmit={handleSubmit}>
    <h2>Edit Product</h2>
    <input
      type="text"
      placeholder="Title"
      value={updatedProduct.title}
      onChange={(e) =>
        setUpdatedProduct({ ...updatedProduct, title: e.target.value })
      }
    />
    <textarea
      placeholder="Description"
      value={updatedProduct.description}
      onChange={(e) =>
        setUpdatedProduct({ ...updatedProduct, description: e.target.value })
      }
    />
    <input
      type="number"
      placeholder="Price"
      value={updatedProduct.price}
      onChange={(e) =>
        setUpdatedProduct({
          ...updatedProduct,
          price: parseFloat(e.target.value),
        })
      }
    />
    <button type="submit">Save</button>
    <button type="button" onClick={onClose}>
      Cancel
    </button>
  </form> */}
  </div>
  )
}

export default EditPage;
