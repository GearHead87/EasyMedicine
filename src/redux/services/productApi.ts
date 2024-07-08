import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
	reducerPath: 'productApi',
	tagTypes: ['products'],
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ page = 1, limit = 5 }) => `products?page=${page}&limit=${limit}`,
			transformResponse: (response: { products: any[]; pagination: any }) => ({
				products: response.products,
				pagination: response.pagination,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'products', id: 'LIST' }],
		}),
	}),
});

export const { useGetProductsQuery, useDeleteProductMutation } = productApi;
