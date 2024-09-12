
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useGetSingleUserQuery } from './UserApi';
// export type Category = {
//   id: number;
//   title: string;
//   description: string;
//   image: number;
// };

const id ="66e2cc437c0562e6c3c227af"
export const categoryApi = createApi({
    

  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({

    getCategories: builder.query({
        query: () => 'categories/',
    }),
    addCategory: builder.mutation({
    
      query: (body) =>       ({

         url: `categories?userId=${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})


export const { useGetCategoriesQuery,useAddCategoryMutation } = categoryApi;