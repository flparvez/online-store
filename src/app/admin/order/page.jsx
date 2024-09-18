"use client";
import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../../store/services/CheckOutApi'; 
import Link from 'next/link';
import {
  Table,
  TableBody,

  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

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
    <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Status</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium"><Link href={`/admin/order/${invoice._id}`}>{truncateText(invoice._id,5)}</Link></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.status}</TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
    </div>
  </div>
  </div>
  )
}

export default Orders
