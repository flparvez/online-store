import React from 'react'
import ShoppingCart from './CartPage'
import { useSelector } from 'react-redux';
const CartPage = () => {

 

  return (
    <div>
      < ShoppingCart />
    </div>
  )
}

export default CartPage

export const metadata= {
  title: "Cart Page",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};