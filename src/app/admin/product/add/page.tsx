
import AddProductForm from '@/components/AddProductForm';
import React from 'react';


export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <AddProductForm />
      


    </div>
  );
}
