import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const id = "66e2c3a77c0562e6c3c2274e";

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User', 'UserList'],
  endpoints: (builder) => ({



    loginUser: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id }],
    }),

    logoutUser: builder.query({
      query: () => '/api/auth/logout',
      providesTags: [{ type: 'User', id }],
    }),

    getUsers: builder.query({
      query: () => 'auth/',
      providesTags: ['UserList'],
    }),

    getSingleUser: builder.query({
      query: () => 'auth/me',
      providesTags: [{ type: 'User', id }],
    }),



    registerUser: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserList'],
    }),

  }),
});

export const {
  useLoginUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
 
  useRegisterUserMutation,
  useLogoutUserQuery
} = UserApi;
