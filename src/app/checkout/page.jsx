"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import {useGetSingleUserQuery} from '../../store/services/UserApi'
const Checkout = () => {
  const {data}=useGetSingleUserQuery()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const placeOrder = async () => {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'user_id_here',  // Replace with actual user ID from authentication
        items: cart.items,
        total: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        transaction: 'transaction_id_here',  // Replace with actual transaction ID
      }),
    });

    const data = await response.json();
    if (data.success) {
      dispatch(clearCart());
      // Handle successful order placement (e.g., redirect to order confirmation page)
    } else {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
