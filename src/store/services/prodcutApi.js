
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
    
    editProduct: builder.mutation({
      query: ({ productSlug, updatedProduct }) => ({
        url: `product/${productSlug}?userId=${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
    
    }),

    getProducts: builder.query({
        query: () => 'product/',
    }),
    getProductBySlug: builder.query({
      query: (productSlug) => `product/${productSlug}`,
    }),
    deleteProduct: builder.mutation({
      query: (productSlug) => ({
        url: `product/${productSlug}?userId=${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: (result, error, id) => [{ type: 'productId', id }],
    }),
    
    
  }),
})


export const { useGetProductsQuery,useGetProductBySlugQuery,useAddProductMutation,useDeleteProductMutation,useEditProductMutation } = prodcutsApi