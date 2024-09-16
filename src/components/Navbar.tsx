"use client"
import React, { useState } from 'react';
import { AiOutlineClose,AiOutlineMenu } from "react-icons/ai";
import { FaShoppingCart } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { useSelector } from 'react-redux';
  
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const cart = useSelector((state:any) => state.cart);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h2 className="text-xl font-bold text-gray-800">Unique Store</h2>
            </Link>
          </div>

         <div className="flex-shrink-0">
            <Link href="/admin">
              <h2 className="text-muted font-bold text-gray-800">Admin</h2>
            </Link>
          </div>

         

          {/* Category Dropdown */}
          <div className="hidden md:block ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/category/electronics">
                      Electronics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/clothing">
                      Clothing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/home">
                      Home & Garden
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Cart and Hamburger */}
          <div className="flex items-center">
            <Link href="/cart">
              <h2 className="text-gray-800 hover:text-gray-600 mr-4">
              Cart ({cart.items.reduce((acc:any, item:any) => acc + item.quantity, 0)})
                <FaShoppingCart size={24} /> 
              </h2>
            </Link>
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu}>
                {isOpen ? <AiOutlineClose size={23} /> : <AiOutlineMenu size={23} />}
              </Button>
            </div>
          </div>
        </div>
            {/* searchbar  */}
            
      <div className="px-2 w-full sm:max-w-full  space-y-1 ">
      <Input placeholder="Search products..." className="w-full mb-4" />
      </div>
      </div>
  
<div className='font-bold'> <Marquee > আসসালামু আলাইকুম সম্মানিত সদস্য আপনাকে অভিনন্দন ওয়েবসাইটে প্রবেশ করার জন্য। আমাদের কাছে পেয়ে যাবেন টেকসই নিত্য প্রয়োজনীয় ইলেকট্রনিক মালামাল। আপনার পছন্দের প্রোডাক্ট  এড কার্ড করে এখনই অর্ডার করুন।</Marquee> </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          
          <Link href="/">
            <h2 onClick={toggleMenu} className="block text-gray-800 hover:text-gray-600">Home</h2>
          </Link>
          <Link href="/shop">
            <h2 onClick={toggleMenu} className="block text-gray-800 hover:text-gray-600">Shop</h2>
          </Link>
          
          <Link href="/about">
            <h2 onClick={toggleMenu} className="block text-gray-800 hover:text-gray-600">About</h2>
          </Link>
          <Link href="/contact">
            <h2 onClick={toggleMenu} className="block text-gray-800 hover:text-gray-600">Contact</h2>
          </Link>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full text-left">Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/category/electronics" onClick={toggleMenu}>
                    Electronics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/clothing" onClick={toggleMenu}>
                    Clothing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/home" onClick={toggleMenu}>
                    Home & Garden
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
