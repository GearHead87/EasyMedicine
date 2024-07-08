// services/categoriesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
