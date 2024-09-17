"use client"

import React from 'react';
import {useGetOrdersQuery} from '../../store/services/CheckOutApi'


const OrderTable = ({user}) => {

const {data} = useGetOrdersQuery(user?._id)

const orders= data?.orders
const filteruser = orders?.filter((item)=> item.user === user._id)
if (!filteruser) return <h2>Loading....</h2>
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">My - Orders</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OrderId</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products + Price + Qunatity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
           
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteruser?.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                {order.products.map((product) => <h2 key={product.product}>{product.title} price : {product.price} qty : {product.quantity}</h2>)}
                </div>
                </td>  {/* show products */}
              <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.transaction}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>

             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default OrderTable;
