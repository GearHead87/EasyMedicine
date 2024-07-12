import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
	reducerPath: 'productApi',
	tagTypes: ['products'],
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		// getProducts: builder.query({
		// 	query: ({ page = 1, limit = 5 }) => `products?page=${page}&limit=${limit}`,
		// 	transformResponse: (response: { products: any[]; pagination: any }) => ({
		// 		products: response.products,
		// 		pagination: response.pagination,
		// 	}),
		// }),
		getProducts: builder.query({
			query: ({ page = 1, limit = 5, search = '' }) => 
				`products?page=${page}&limit=${limit}&search=${search}`,
			transformResponse: (response: { products: any[]; pagination: any }) => ({
				products: response.products,
				pagination: response.pagination,
			}),
		}),
		getProductById: builder.query({
			query: (id) => `products/${id}`,
			transformResponse: (response: { product: any[] }) => ({
				product: response.product,
			}),
		}),
		getProductsByCategory: builder.query({
			query: ({ categoryId, page = 1, limit = 5, search = '' }) =>
				`products?categoryId=${categoryId}&page=${page}&limit=${limit}&search=${search}`,
			transformResponse: (response: {
				products: any[];
				pagination: { total: number; page: number; limit: number; totalPages: number };
			}) => ({
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
		updateProduct: builder.mutation({
			query: ({ id, formData }) => {
				console.log(...formData);
				return {
					url: `products/${id}`,
					method: 'PATCH',
					body: formData,
					headers: { 'Content-Type': 'multipart/form-data' },
				};
			},
		}),
	}),
});

export const {
	useGetProductsQuery,
	useDeleteProductMutation,
	useGetProductsByCategoryQuery,
	useUpdateProductMutation,
	useGetProductByIdQuery,
} = productApi;
