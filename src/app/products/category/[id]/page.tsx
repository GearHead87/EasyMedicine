// src/app/products/category/[id]/page.tsx
'use client';

import ProductCard from '@/components/component/home/ProductCard';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';
import { useState } from 'react';

const CategoryProductsPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;

	const { data, error, isLoading } = useGetProductsByCategoryQuery({
		categoryId: id,
		page: currentPage,
		limit: itemsPerPage,
	});

	console.log(data);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	const { products, pagination } = data;
	const totalPages = pagination.totalPages;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Category Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<Pagination className='mt-4'>
				<PaginationContent>
					<PaginationPrevious
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					/>
					{Array.from({ length: totalPages }, (_, index) => (
						<PaginationItem key={index} active={index + 1 === currentPage}>
							<PaginationLink onClick={() => setCurrentPage(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationNext
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
					/>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default CategoryProductsPage;
