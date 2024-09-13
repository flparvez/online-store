"use client"
/** @format */

import PageTitle from "@/components/PageTitle";

import { DollarSign, Users, CreditCard, Activity } from "lucide-react";



import {  useDeleteProductMutation, useGetProductsQuery } from "@/store/services/prodcutApi";
import AdminProductTile from "@/components/ProductListAdmin";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import SideNavbar from "@/components/sideNavbar";
import { useGetSingleUserQuery } from "@/store/services/UserApi";



export default function Home() {



  const {data,isLoading} = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation();

const handleDelete = async (productSlug) => {
    await deleteProduct(productSlug);
  };

  // console.log(data?.products)
  return (
    <div className=""> 
    <SideNavbar />
    <div className="flex flex-col gap-5  w-full">


      <section className="">
     
        <CardContent className="w-full">
        <div className="mb-5 w-full flex justify-end">
        <h2> <Link href="/admin/product/add" >Add New Product</Link>
          
        </h2>
      </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data && data.products.length > 0
          ? data.products.map((productItem)=> (
              // eslint-disable-next-line react/jsx-key
              <AdminProductTile 
             
                // setOpenCreateProductsDialog={setOpenCreateProductsDialog}
               
                product= {productItem }
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
{/* <ProductList data={data && data?.products} /> */}

        
        </CardContent>


      </section>
    </div>
    </div>
  );
}