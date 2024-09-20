"use client"; // Ensure this component is client-side only if needed
import {
    Card,
    CardContent,
    
  } from "@/components/ui/card"
  import Pagination from '@/components/Pagination'  
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";



const ProductList = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

 // Calculate the current products
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
}


  return (
   

   <Card >
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     
      {currentProducts.map((product) => (
        <Link key={product._id} href={`/product/${product.slug}`} >
        <div className="relative">
          <Image width={300} height={300}
            src={product?.images}
            alt={product?.name}
            className="w-full sm:h-[300px] h-[250px] object-cover rounded-t-lg"
          />
  
          {product?.stock === 0 ? (
            <Badge className="absolute top-2 left-2  bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.stock < 30? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.stock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{truncateText(product?.name,34)}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {product.tags}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.price > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ৳{product?.price + 220}
            </span>
            {product?.price > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ৳{product?.price}
              </span>
            ) : null}
          </div>
          
        </CardContent>
        </Link>
           ))}
      </div>
      
      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={paginate}
      />
    </Card>
       
  );
};

export default ProductList;
