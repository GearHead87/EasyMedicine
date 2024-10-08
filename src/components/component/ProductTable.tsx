//@ts-nocheck
// components/ProductTable.tsx
'use client';
import React, { useState } from 'react';
import { useDeleteProductMutation, useGetProductsQuery } from '@/redux/services/productApi';
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';

interface Category {
	id: string;
	name: string;
}

const ProductTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
		refetch: productRefetch,
	} = useGetProductsQuery({ page: currentPage, limit: itemsPerPage });
	const {
		data: categoriesData,
		error: categoriesError,
		isLoading: categoriesLoading,
	} = useGetCategoriesQuery({});

	const [deleteProduct] = useDeleteProductMutation();

	if (productsLoading || categoriesLoading) return <div>Loading...</div>;
	if (productsError || categoriesError) return <div>Error loading data</div>;

	const handleDelete = async (id: string) => {
		await deleteProduct(id);
		productRefetch();
	};

	const getCategoryName = (categoryId: string) => {
		const category = categoriesData?.find((cat: Category) => cat.id === categoryId);
		return category ? category.name : 'Unknown Category';
	};

	const totalPages = Math.ceil(productsData?.pagination.total / itemsPerPage);

	return (
		<div>
			<Table>
				<TableCaption>A list of your products.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Product Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{productsData?.products.map((product) => (
						<TableRow key={product.id}>
							<TableCell className="font-medium">{product.name}</TableCell>
							<TableCell>{product.description}</TableCell>
							<TableCell>{getCategoryName(product?.categoryId)}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell>{product.stock}</TableCell>
							<TableCell className="text-right">
								<Button
									variant="ghost"
									onClick={() => console.log('Edit', product.id)}
								>
									<Link href={`/dashboard/manage-product/${product.id}`}>
										Edit
									</Link>
								</Button>
								<Button
									variant="destructive"
									onClick={() => handleDelete(product.id)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationPrevious
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						// disabled={currentPage === 1}
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

export default ProductTable;
