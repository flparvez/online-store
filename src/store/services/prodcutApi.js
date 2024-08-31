
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const id ="66d2c17da37b890c64113523"
export const prodcutsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
    
      query: (body) =>       ({

         url: `product?userId=${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'product', id: 'LIST' }],
    }),
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


export const { useGetProductsQuery,useGetProductByIdQuery,useAddProductMutation } = prodcutsApi