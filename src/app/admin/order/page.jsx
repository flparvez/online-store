"use client";
import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../../store/services/CheckOutApi'; 
import Link from 'next/link';

const Orders = () => {
  const { data, isLoading, isError } = useGetOrdersQuery(); // Replace with actual query
  const [orderData, setOrderData] = useState([]);
// console.log(data?.orders)
  useEffect(() => {
    if (data) {
      setOrderData(data?.orders);
    }
  }, [data]);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "";
    }
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">Admin Panel - Orders</h1>
    <div className="sm:container mx-auto sm:px-4 py-8 px-2">
    <h1 className="text-4xl font-bold text-center mb-8">My Orders</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderData.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap"> <Link href={`/admin/order/${order._id}`}>{truncateText(order._id,5)}</Link>  </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">৳{order.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  )
}

export default Orders
