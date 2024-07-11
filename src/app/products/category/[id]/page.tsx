// src/app/products/category/[id]/page.tsx
'use client';

import ProductCard from '@/components/component/home/ProductCard';
import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';

const CategoryProductsPage = ({ params }: { params: { id: string } }) => {

	const { id } = params;
	const { data, error, isLoading } = useGetProductsByCategoryQuery(id);
    console.log(data);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Category Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default CategoryProductsPage;
