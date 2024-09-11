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
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have this utility for conditional classes
import Link from "next/link";
import { Button } from "./ui/button";



const ProductList = ({product}) => {

  const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
}
  return (
   
    <div className=" w-full">

       

               
            <Card>
            <Link href={`/product/${product.slug}`}>
      <CardHeader>
        <CardTitle><h3 className="sm:text-xl text-sm sm:font-bold mb-2 mt-2 text-center ">{truncateText(product.name,24)}</h3></CardTitle>
        <CardDescription><div className=" overflow-hidden">
                <img
                src={product.images}
                alt="text" 
                className="w-full sm:h-[250px] h-[180px] object-cover rounded-t-lg"
              />
              </div>
        </CardDescription>
      </CardHeader>
      </Link>
      <CardContent>
      
                <p className="text-gray-500 mb-2 text-center">{product.category}</p>
                <p className="text-lg font-bold text-center">${product.price}</p>
         
      </CardContent>
      {/* <CardFooter className="">
       
      </CardFooter> */}
  
    </Card>
    

       
         
      </div>
  );
};

export default ProductList;
