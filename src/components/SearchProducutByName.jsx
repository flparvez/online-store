"use client"
import { useGetProductsQuery } from '@/store/services/prodcutApi'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

const SearchProducutByName = () => {
 
    // function for navlist items page routing active status
    
        const [navbar,setNavbar] =useState(false);
        const [searchbar,setSearchbar] =useState(false);
   

    const handleSearchbarClose =()=>{
        setSearchbar(false)
    }


    const {data} = useGetProductsQuery()
    const products = data?.products;

// search function by name of products
    const [productShortName,setProductShortName] =useState('')
    const [searchResult,setSearchResult]=useState(null)
    useEffect(() => {
        if (!productShortName.trim()) {
            setSearchResult([]);
            return;
        }
            const filteredProduct = products.filter(product => product.name.toLowerCase().includes(productShortName.toLowerCase()))
            setSearchResult(filteredProduct);
        }, [productShortName]);
            
       // handle Product
       const handleProductClick = () => {
        setProductShortName('');
        setSearchbar(false)
    }

          // handle search bar

          const searchRef =useRef(null)
          // function for when click outside of search bar
          
          const handleOutsideClick = (event) => {
              if (searchRef.current &&!searchRef.current.contains(event.target)) {
                  setProductShortName('')
                  setSearchbar(false)
              }
          }
          useEffect(() => {
              document.addEventListener('mousedown',handleOutsideClick);
              return () => {
                  document.removeEventListener('mousedown', handleOutsideClick);
              };
          }, []);


  return (
   <div className="container mx-auto px-4 py-4">
    
            <form className={searchbar ? "search_bar active" : "search_bar"}>

            <div className="mb-4">
      <input
        type="text"
     
        placeholder="Search products name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={productShortName} onChange={(e)=> setProductShortName(e.target.value)} />
            
                </div>
                {
                    productShortName && (
                        <div className=''>
                            <h2>---:Search Result:----</h2>
                            <ul>
                                {searchResult.length > 0 ?(
                                   searchResult.slice(0,20).map((product)=>(
                                   
                             <div key={product._id}  className="bg-white rounded-lg shadow-md p-6">
                                 <Link   href={`/product/${product.slug}`} onClick={handleProductClick}  >
          <img src={product.images} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          
          <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
          </Link> 
        </div>
                                
                                   ))
                                ) : (
                                    <p>No Product Found </p>
                                )}
                            </ul>
                        </div>
                    )
                }

            </form>
         
   
    </div>
  )
}

export default SearchProducutByName
