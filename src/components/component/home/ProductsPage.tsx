'use client';
import { useGetProductsQuery } from '@/redux/services/productApi';
import React from 'react';
import ProductCard from './ProductCard';

const ProductsPage = () => {
	const { data, error, isLoading } = useGetProductsQuery({});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	const products = Array.isArray(data?.products) ? data?.products : [];
	console.log(data?.products);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{products?.map((product: { id: React.Key | null | undefined }) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductsPage;
