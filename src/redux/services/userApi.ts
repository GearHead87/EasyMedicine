// src/redux/services/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: ({ search = '', page = 1, limit = 10 }) =>
				`users?search=${search}&page=${page}&limit=${limit}`,
			transformResponse: (response: { users: []; pagination: {totalPages:number} }) => ({
				users: response.users,
				pagination: response.pagination,
			}),
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
