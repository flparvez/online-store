'use client';

import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import SearchProducutByName from '@/components/SearchProducutByName'

import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { ShoppingCart } from 'lucide-react';
import { useGetSingleUserQuery } from '@/store/services/UserApi';
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
  const { data, isLoading, isError } = useGetSingleUserQuery("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const cart = useSelector((state: any) => state.cart);

  return (
    <nav className="bg-white sm:shadow-md sticky top-0 z-50">
      <div className="sm:max-w-3xl w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h2 className="sm:text-xl text-sm font-bold text-gray-800">Unique Store</h2>
            </Link>
          </div>

          <div className="flex-shrink-0">
            {/* {  data? ( */}
              <Link href="/profile">
                <h2 className="sm:text-muted text-sm font-bold text-gray-800">Profile</h2>
              </Link>
            {/* ) : (
              <Link className="sm:text-muted text-sm font-bold text-gray-800" href="/auth/login">
                Login
              </Link>
            )} */}
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
                    <Link href="/category/electronics">Electronics</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/clothing">Clothing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/home">Home & Garden</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Cart and Hamburger */}
          <div className="flex items-center">
            <Link href="/cart">
              <div className="relative inline-flex">
                <ShoppingCart className="w-10 h-8 text-gray-700" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full">
                  ({cart.items.reduce((acc: any, item: any) => acc + item.quantity, 0)})
                </span>
              </div>
            </Link>
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu}>
                {isOpen ? <AiOutlineClose size={23} /> : <AiOutlineMenu size={23} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="px-2 w-full sm:max-w-full space-y-1">
        <SearchProducutByName />
        </div>
      </div>

      {/* Marquee */}
      <div className="font-bold">
        <Marquee>
          <br />
          আসসালামু আলাইকুম সম্মানিত সদস্য আপনাকে অভিনন্দন ওয়েবসাইটে প্রবেশ করার জন্য। আমাদের কাছে পেয়ে যাবেন টেকসই নিত্য প্রয়োজনীয় ইলেকট্রনিক মালামাল। আপনার পছন্দের প্রোডাক্ট এড কার্ড করে এখনই অর্ডার করুন।
        </Marquee>
      </div>

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
                <Link href="/category/electronics" onClick={toggleMenu}>Electronics</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/category/clothing" onClick={toggleMenu}>Clothing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/category/home" onClick={toggleMenu}>Home & Garden</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
