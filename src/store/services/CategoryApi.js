import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const id = "66e2cc437c0562e6c3c227af";

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => 'categories/',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    addCategory: builder.mutation({
      query: (body) => ({
        url: `categories?userId=${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;
