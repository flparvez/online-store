
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import ProductsView from '@/store/features/products/ProductsView'
import React from 'react'

const Home = () => {
  return (
    <div>
   <Navbar/>
   <Header/>
      <ProductsView />
    </div>
  )
}

export default Home
