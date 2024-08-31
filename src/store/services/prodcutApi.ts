// 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const prodcutsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
        query: () => 'product',
    })
    
  }),
})


export const { useGetProductsQuery } = prodcutsApi