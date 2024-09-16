"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/cartSlice';

import {useGetSingleUserQuery} from '../../store/services/UserApi'
import {useAddOrderMutation} from '../../store/services/CheckOutApi'
import { useRouter } from 'next/navigation';



const CheckoutPage = () => {
const router = useRouter()
const [addOrder] = useAddOrderMutation()

  const {data}=useGetSingleUserQuery()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
// console.log(data?.data?._id)
    const [paymentDetails, setPaymentDetails] = useState({
      cname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      transaction: '',
      paymentType:"",
     
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const handleCardInput = (e) => {
      const { name, value } = e.target;
      setPaymentDetails({
        ...paymentDetails,
        [name]: value
      });
    };
  

    const ndata = {
      userci:data?.data?._id,
      name:paymentDetails.cname,
      email:paymentDetails.email,
      phone:paymentDetails.phone,
      address:paymentDetails.address,
      city:paymentDetails.city,
      items: cart.items,
       total: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      transaction:paymentDetails.transaction,
      paymentType:paymentDetails.paymentType
    }

   
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addOrder(ndata).unwrap();
         // Clear the cart
         setIsProcessing(false)
      dispatch(clearCart());
      alert('Order placed successfully!');
       router.push('/auth/profile')
      } catch (err) {

      alert('Failed to place order.');
        console.error('Failed to save the order: ', err);
      }
    };






    
  const partial =80;

  if (cart.items.length === 0) return <h2>Your Cart is Empty</h2>
  return (
    <div>
    
      <form className="bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Checkout Details</h2>
      <div className="mb-4">
        <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-700">Customer Name <span className='text-red-600'>*</span></label>
        <input
          type="text"
          id="CustomerName"
          name="cname"
          value={paymentDetails.cname}
          onChange={handleCardInput}
          placeholder="Enter Customer Name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={paymentDetails.email}
          onChange={handleCardInput}
          placeholder="Enter Your Email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          
        />
      </div>
      
       {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Mobile No <span className='text-red-600'>*</span></label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={paymentDetails.phone}
          onChange={handleCardInput}
          placeholder="Enter Your Valid Number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
  {/* address */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address <span className='text-red-600'>*</span></label>
        <input
          type="text"
          id="address"
          name="address"
          value={paymentDetails.address}
          onChange={handleCardInput}
          placeholder="Enter Your Delivery Address"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

  {/* city */}
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City <span className='text-red-600'>*</span></label>
        <input
          type="text"
          id="city"
          name="city"
          value={paymentDetails.city}
          onChange={handleCardInput}
          placeholder="Enter Your City Name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

  {/* Payment Type */}
  <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Type <span className='text-red-600'>*</span></label>
          <div className="flex items-center">
            <input
              type="radio"
              id="fullPayment"
              name="paymentType"
              value="full"
              checked={paymentDetails.paymentType === 'full'}
              onChange={handleCardInput}
              className="mr-2"
            />
            <label htmlFor="fullPayment" className="mr-4">Full Payment</label>
            <input
              type="radio"
              id="partialPayment"
              name="paymentType"
              value="partial"
              checked={paymentDetails.paymentType === 'partial'}
              onChange={handleCardInput}
              className="mr-2"
            />
            <label htmlFor="partialPayment">Partial Payment</label>
          </div>
        </div>

        {/* Partial Amount */}
        {paymentDetails.paymentType === 'partial' && (
          <div className="mb-4">
            <label htmlFor="partialAmount" className="block text-sm font-medium text-gray-700">Partial Amount <span className='text-red-600'>*</span></label>
            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'>Partial: {partial} + Delivery Charge: 120 = {partial + 120}</h2>
          </div>
        )}
     {paymentDetails.paymentType === 'full' && (
          <div className="mb-4">
            <label htmlFor="partialAmount" className="block text-sm font-medium text-gray-700">Full Amount <span className='text-red-600'>*</span></label>
            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'>Total Price: {ndata?.total} + Delivery Charge: 100 = {ndata?.total + 100}</h2>
           
          </div>
        )}
<h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'>Bkash(personal): 01608257876</h2>
<br />
        {/* Transaction ID */}
        <div className="mb-4">
          <label htmlFor="transaction" className="block text-sm font-medium text-gray-700">Transaction ID <span className='text-red-600'>*</span></label>
          <input
            type="text"
            id="transaction"
            name="transaction"
            value={paymentDetails.transaction}
            onChange={handleCardInput}
            placeholder="Enter Your Transaction ID"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>


      <button
        type="submit"
        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </form>
      
    </div>
  );
  }

export default CheckoutPage;
