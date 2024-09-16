"use client";
import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../../store/services/CheckOutApi'; 
const Orders = () => {
  const { data, isLoading, isError } = useGetOrdersQuery(); // Replace with actual query
  const [orderData, setOrderData] = useState([]);
// console.log(data?.orders)
  useEffect(() => {
    if (data) {
      setOrderData(data?.orders);
    }
  }, [data]);
console.log(orderData)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">Admin Panel - Orders</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderData?.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.city}</td>
              {
                order?.products?.map((item) => (
                  <div key={item._id}>
                  <thead>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Price</th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>

                     
                  </thead>
                  <div key={item._id}>
                    <tbody>
                    <td className="px-6 py-4 whitespace-nowrap">Name:{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">price:{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">quantity:{item.quantity}</td>
                    </tbody>
                    </div>
                    
                </div>))
              }
 
              <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.transaction}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.paymentType}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Orders
