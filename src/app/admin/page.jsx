"use client"
/** @format */
import {  useDeleteProductMutation, useGetProductsQuery } from "@/store/services/prodcutApi";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AdminProductTile from "@/components/ProductListAdmin";
import SideNavbar from "@/components/sideNavbar";





export default function Home() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);






  // console.log(data?.products)
  return (
    
       
        
        <div
        className={cn(
          "rounded-md flex  bg-gray-100 dark:bg-neutral-800 h-full  w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      
        )}
      >
        <SideNavbar />
        <Dashboard />
 
        
      </div>

    
  
  );
}

// Dummy dashboard component with content
const Dashboard = () => {

  const {data,isLoading} = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation();

const handleDelete = async (productSlug) => {
    await deleteProduct(productSlug);
  };
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
        <div  className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
              <h2>Total Products</h2>
            </div>
      <div  className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
              <h2>Total Order</h2>
            </div>
 
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data && data.products.length > 0
          ? data?.products.map((productItem)=> (
              // eslint-disable-next-line react/jsx-key
              <AdminProductTile 
             
                // setOpenCreateProductsDialog={setOpenCreateProductsDialog}
               
                product= {productItem }
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      </div>
    </div>
  );
};