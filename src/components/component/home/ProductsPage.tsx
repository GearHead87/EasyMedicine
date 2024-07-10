'use client';
import { useGetProductsQuery } from '@/redux/services/productApi';
import React from 'react';
import ProductCard from './ProductCard';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

const ProductsPage = () => {
	const { data, error, isLoading } = useGetProductsQuery({});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	const products = Array.isArray(data?.products) ? data?.products : [];
	console.log(data?.products);

	return (
		<Carousel className="w-full max-w-sm md:max-w-2xl lg:max-w-none">
			<CarouselContent className="-ml-1">
				{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}
				{products?.map((product: { id: React.Key | null | undefined },index) => (
					<CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
						<ProductCard key={product.id} product={product} />
					</CarouselItem>
				))}
				{/* </div> */}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
		// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		// 	{products?.map((product: { id: React.Key | null | undefined }) => (
		// 		<ProductCard key={product.id} product={product} />
		// 	))}
		// </div>
	);
};

export default ProductsPage;
