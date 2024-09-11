"use client"
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaStar, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Premium T-Shirt', price: 29.99, quantity: 1, size: 'M', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', rating: 4 },
    { id: 2, name: 'Designer Jeans', price: 79.99, quantity: 1, size: '32', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d', rating: 5 },
    { id: 3, name: 'Leather Jacket', price: 199.99, quantity: 1, size: 'L', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5', rating: 3 },
  ]);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    // Add drag-and-drop functionality here
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateSize = (id, newSize) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, size: newSize } : item
      )
    );
  };

  const updateRating = (id, newRating) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, rating: newRating } : item
      )
    );
  };

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
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center"
              >
              <div >
              <img className='w-24 h-24 object-cover rounded-md mr-6' src={item.image} alt={item.name}  />

                
              </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-gray-700">
                      <FaMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-gray-700">
                      <FaPlus />
                    </button>
                  </div>
                  <select
                    value={item.size}
                    onChange={(e) => updateSize(item.id, e.target.value)}
                    className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${star <= item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => updateRating(item.id, star)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(parseFloat(calculateTotal()) + 5).toFixed(2)}</span>
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
    </div>
  );
};

export default ShoppingCart;