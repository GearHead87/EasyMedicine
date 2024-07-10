// components/ProductTable.tsx
import React from 'react';
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

const ProductTable = () => {
	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
		refetch: productRefetch
	} = useGetProductsQuery({});
	const {
		data: categoriesData,
		error: categoriesError,
		isLoading: categoriesLoading,
	} = useGetCategoriesQuery({});
	const [deleteProduct] = useDeleteProductMutation();

    
    console.log(productsData,categoriesData);

	if (productsLoading || categoriesLoading) return <div>Loading...</div>;
	if (productsError || categoriesError) return <div>Error loading data</div>;

	const handleDelete = async (id: string) => {
		await deleteProduct(id);
		productRefetch()
	};

	const getCategoryName = (categoryId: string) => {
		const category = categoriesData?.find((cat) => cat.id === categoryId);
		return category ? category.name : 'Unknown Category';
	};

	return (
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
							<Button variant="ghost" onClick={() => console.log('Edit', product.id)}>
								Edit
							</Button>
							<Button variant="destructive" onClick={() => handleDelete(product.id)}>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ProductTable;
