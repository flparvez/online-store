"use client"
/** @format */

import PageTitle from "@/components/PageTitle";

import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";

import  { ProductList, SalesProps } from "@/components/SalesCard";
import { useGetProductsQuery } from "@/store/services/prodcutApi";



const cardData: CardProps[] = [
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


// const {data}:SalesProps[] = useGetProductsQuery()
  
  


export default function Home() {
  const {data,isLoading} = useGetProductsQuery()
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
          <section>
            <p>Product</p>
            <p className="text-sm text-gray-400">
            All Product
            </p>
          </section>
<ProductList data={data && data?.products} />

        
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}