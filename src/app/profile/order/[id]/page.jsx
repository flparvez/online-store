"use client"
import {useGetOrderByIdQuery} from '../../../../store/services/CheckOutApi'
const OrderPage = ({params}) => {

    const {data} = useGetOrderByIdQuery(params.id)
    if (data) {
      const order = data?.order;

  
    

  return (
    // <h2>Test</h2>
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">Order Details</h1>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Order ID: {order._id}</h2>
      <div className="mb-4">
        <span className="font-medium">Customer Name:</span> {order.name}
      </div>
      <div className="mb-4">
        <span className="font-medium">Email:</span> {order.email}
      </div>
      <div className="mb-4">
        <span className="font-medium">Phone:</span> {order.phone}
      </div>
      <div className="mb-4">
        <span className="font-medium">Address:</span> {order.address}, {order.city}
      </div>
      <div className="mb-4">
        <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
      </div>
      <div className="mb-4">
        <span className="font-medium">Transaction ID:</span> {order.transaction}
      </div>
      <div className="mb-4">
        <span className="font-medium">Status:</span> {order.status}
      </div>
      <div className="mb-4">
        <span className="font-bold text-xl">Products:</span>
        <table className="min-w-full bg-white divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.products.map((product) => (
              <tr key={product.product}>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">৳{product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}else{
  return <h1>Loading...</h1>
}
}
export default OrderPage
