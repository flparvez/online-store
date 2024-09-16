import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const id = "66e2c3a77c0562e6c3c2274e";

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User', 'UserList'],
  endpoints: (builder) => ({

    getUsers: builder.query({
      query: () => 'users/',
      providesTags: ['UserList'],
    }),

    getSingleUser: builder.query({
      query: () => 'users/me',
      providesTags: [{ type: 'User', id }],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id }],
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: 'users/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserList'],
    }),

  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = UserApi;
