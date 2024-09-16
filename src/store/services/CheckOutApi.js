
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const id ="66e2cc437c0562e6c3c227af"
// for update
export const checkoutApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({


    addOrder: builder.mutation({
      query: (body) =>    ({

         url: `order?userId=${body?.userci}`,
        method: 'POST',
        body,
      }),
    //   invalidatesTags: [{ type: 'product', id: 'LIST' }],
    }),
    
    // editProduct: builder.mutation({
    //   query: ({ productSlug, updatedProduct }) => ({
    //     url: `product/${productSlug}?userId=${id}`,
    //     method: 'PATCH',
    //     body: updatedProduct,
    //   }),
    
    // }),

    getOrders: builder.query({
        query: (id) =>   ({

          url: `order?userId=${id}`,
       }),
    }),
    // getProductBySlug: builder.query({
    //   query: (productSlug) => `product/${productSlug}`,
    // }),


    // deleteProduct: builder.mutation({
    //   query: (productSlug) => ({
    //     url: `product/${productSlug}?userId=${id}`,
    //     method: 'DELETE',
    //   }),
    //   // invalidatesTags: (result, error, id) => [{ type: 'productId', id }],
    // }),
    
    
  }),
})


export const { useAddOrderMutation,useGetOrdersQuery } = checkoutApi;