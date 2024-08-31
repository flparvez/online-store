
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// export type Category = {
//   id: number;
//   title: string;
//   description: string;
//   image: number;
// };
const id ="66d2c17da37b890c64113523"
export const UserApi = createApi({
    

  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({

    getUsers: builder.query({
        query: () => 'users/',
    }),
   getSingleUser: builder.query({
        query: () => 'users/me',
    }),

    // addCategory: builder.mutation({
    
    //   query: (body) =>      ({

    //      url: `categories?userId=${id}`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    // }),
  }),
})


export const {useGetUsersQuery,useGetSingleUserQuery  } = UserApi;