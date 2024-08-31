
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const prodcutsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({

    getProducts: builder.query({
        query: () => 'product/',
    }),
    getProductById: builder.query({
      query: (productId) => `product/${productId}`,
    }),

    deleteProductById: builder.query({
      query: (productId) => `product/${productId}`,
      method: 'DELETE',
    })
    
  }),
})


export const { useGetProductsQuery,useGetProductByIdQuery } = prodcutsApi