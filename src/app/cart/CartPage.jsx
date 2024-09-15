"use client"
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaStar, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '@/store/cartSlice';
const ShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();


console.log(cartItems)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);





  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
  }

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderConfirmed(true);
  };

  return (
   <>
<div className="p-6">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        
        <div>
        { cartItems.map(item => (
            <div key={item.id} className="flex justify-between p-4">
              <img src={item.img} alt={item.name} className="w-20" />
              <div>
                <p>{truncateText(item.name,20)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
          
          
          <p className="font-bold text-xl">Total: ${item.price}</p>
     
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 dark:bg-white  dark:text-black bg-white text-black h-20 hover:bg-yellow-500 font-bold py-2 px-2 rounded"
          >
            Clear Cart
          </button>

          </div>
             ))}
        </div>
        
      )}
    </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(parseFloat(calculateTotal()) + 0).toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="number"
                value={cardDetails.number}
                onChange={handleCardInput}
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="name"
                value={cardDetails.name}
                onChange={handleCardInput}
                placeholder="John Doe"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInput}
                  placeholder="MM/YY"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  id="cardCVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInput}
                  placeholder="123"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
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
     



      {orderConfirmed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <button
              onClick={() => setOrderConfirmed(false)}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    
</>
   
  );
};

export default ShoppingCart;
