import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
	reducerPath: 'categoriesApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Category'],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => 'categories',
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }: { id: string }) => ({ type: 'Category', id })),
							{ type: 'Category', id: 'LIST' },
					  ]
					: [{ type: 'Category', id: 'LIST' }],
		}),
		addCategory: builder.mutation({
			query: (category) => ({
				url: 'categories',
				method: 'POST',
				body: category,
			}),
			invalidatesTags: [{ type: 'Category', id: 'LIST' }],
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: 'categories',
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: [{ type: 'Category', id: 'LIST' }],
		}),
	}),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } =
	categoriesApi;
