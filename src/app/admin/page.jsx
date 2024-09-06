"use client"
/** @format */

import PageTitle from "@/components/PageTitle";

import { DollarSign, Users, CreditCard, Activity } from "lucide-react";



import {  useDeleteProductMutation, useGetProductsQuery } from "@/store/services/prodcutApi";
import AdminProductTile from "@/components/ProductListAdmin";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";




const cardData= [
  {
    label: "Total Porducts",
    amount: "23",
    discription: "Brand New Porduct",
    icon: DollarSign
  },
  {
    label: "Total User",
    amount: "12",
    discription: "+verified user",
    icon: Users
  },
  {
    label: "Category",
    amount: "7",
    discription: "all categories",
    icon: CreditCard
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity
  }
];


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};


export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const {data,isLoading} = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation();

const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  console.log(data?.products)
  return (
    
    <div className="flex flex-col gap-5  w-full">
  
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
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
                setFormData={setFormData}
                // setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                // setCurrentEditedId={setCurrentEditedId}
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
  );
}