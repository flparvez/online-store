"use client"; // Ensure this component is client-side only if needed
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import React from "react";

import Link from "next/link";
import { Button } from "./ui/button";

import Image from "next/image";
import { Badge } from "./ui/badge";



const ProductList = ({product}) => {

  const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
}
console.log(product)
  return (
   
    // <div className=" w-full">
   <Card className="w-full max-w-sm mx-auto">
      <div >
        <Link href={`/product/${product.slug}`} >
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
      </div>
      
      {/* <CardFooter>
        {product?.stock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            // onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter> */}
    </Card>
       


       
   
  );
};

export default ProductList;
