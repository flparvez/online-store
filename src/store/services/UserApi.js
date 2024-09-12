
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// export type Category = {
//   id: number;
//   title: string;
//   description: string;
//   image: number;
// };
const id ="66e2c3a77c0562e6c3c2274e"
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

    loginUser: builder.mutation({
    
      query: (body) =>      ({

         url: 'users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'login', id: 'LIST' }],
    }),
  }),
})


export const {useGetUsersQuery,useGetSingleUserQuery, useLoginUserMutation } = UserApi;