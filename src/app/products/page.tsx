'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useGetProductsQuery } from '@/redux/services/productApi';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import ProductCard from '@/components/component/home/ProductCard';
import { useState } from 'react';

const ProductsPage = () => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;
	const searchParams = useSearchParams();
	const page = searchParams.get('page') || '1';
	const search = searchParams.get('search') || '';
	const { data, error, isLoading } = useGetProductsQuery({
		page: currentPage,
		limit: itemsPerPage,
		search,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	const handlePageChange = (newPage: number) => {
		router.push(`/products?page=${newPage}&search=${search}`);
	};

	const totalPages = Math.ceil(data?.pagination.total / itemsPerPage);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Products</h1>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{data?.products.map((product: any) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationPrevious
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						// disabled={currentPage === 1}
					/>
					{Array.from({ length: totalPages }, (_, index) => (
						<PaginationItem key={index}>
							<PaginationLink onClick={() => setCurrentPage(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationNext
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						// disabled={currentPage === totalPages}
					/>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default ProductsPage;
