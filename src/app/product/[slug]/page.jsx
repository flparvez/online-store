
import ProductPage from './ProductDetails'

const page = ({ params }) => {


  return (
    <div>
      <ProductPage params ={params} />
    </div>
  )
}

export default page

export const metadata ={
  title: 'Product Details',
  description: 'View detailed information about a product',
  keywords: 'e-commerce, react, tailwind, next js'
}
