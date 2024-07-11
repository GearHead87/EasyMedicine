'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useAxiosCommon from '@/hooks/useAxiosCommon';
import { cn } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi';
import {
	useGetProductByIdQuery,
	useGetProductsQuery,
	useUpdateProductMutation,
} from '@/redux/services/productApi';
import React, { useState, useEffect } from 'react';

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
	const { id: productId } = params;
	const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(productId);
	const [updateProduct] = useUpdateProductMutation();
	const { data: categories, error, isLoading } = useGetCategoriesQuery({});
	const axiosCommon = useAxiosCommon();
	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [categoryId, setCategoryId] = useState('');
	const [mgOptions, setMgOptions] = useState<Array<{ mg: number; price: number }>>([
		{ mg: 0, price: 0 },
	]);
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		if (productData) {
			setProductName(productData?.product?.name);
			setDescription(productData?.product?.description);
			setPrice(productData?.product?.price);
			setStock(productData?.product?.stock);
			setCategoryId(productData?.product?.categoryId);
			setMgOptions(productData?.product?.variants);
		}
	}, [productData]);
	console.log('from api', productData?.product);

	const handleMgOptionChange = (index: number, field: string, value: number) => {
		const newMgOptions = [...mgOptions];
		newMgOptions[index] = {
			...newMgOptions[index],
			[field]: value,
		};
		setMgOptions(newMgOptions);
	};
	const handleAddMgOption = () => {
		setMgOptions([...mgOptions, { mg: 0, price: 0 }]);
	};

	const handleRemoveMgOption = (index: number) => {
		setMgOptions(mgOptions.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newProductData = {
			name: productName,
			description,
			price,
			stock,
			categoryId,
			mgOptions,
			image,
		};

		const formData = new FormData();
		formData.append('name', newProductData.name);
		formData.append('description', newProductData.description);
		formData.append('price', newProductData.price.toString());
		formData.append('stock', newProductData.stock.toString());
		formData.append('categoryId', newProductData.categoryId);
		formData.append('mgOptions', JSON.stringify(newProductData.mgOptions));
		if (newProductData.image) {
			formData.append('image', newProductData.image);
		}
		
		try {
			// const { data } = await updateProduct({ id: productId, formData });
			const { data } = await axiosCommon.patch(`/api/products/${productId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
			<h1 className="text-2xl font-bold mb-4">Update Product</h1>
			{isProductLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<div>
						<Label htmlFor="Product Name">Product Name</Label>
						<Input
							type="text"
							name="productName"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
							required
						/>
					</div>

					<div>
						<Label htmlFor="Description">Description</Label>
						<Textarea
							value={description}
							name="description"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>

					<div>
						<Label htmlFor="Price">Price</Label>
						<Input
							type="number"
							name="price"
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
							required
						/>
					</div>

					<div>
						<Label htmlFor="Stock">Stock</Label>
						<Input
							type="number"
							name="stock"
							value={stock}
							onChange={(e) => setStock(Number(e.target.value))}
							required
						/>
					</div>

					<div>
						<Label htmlFor="Category ID">Category</Label>
						<Select
                            // onOpenChange={}
							onValueChange={(value) => value && setCategoryId(value)}
							value={categoryId}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{isLoading ? (
									<SelectItem value=" " disabled>
										Loading...
									</SelectItem>
								) : error ? (
									<SelectItem value=" " disabled>
										Error loading categories
									</SelectItem>
								) : (
									categories?.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id}
										>
											{category.name}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label className="text-gray-700">Product Image</Label>
						<Input
							type="file"
							name="image"
							className="mt-1 block w-full text-gray-700"
							onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
						/>
					</div>

					<div className="mb-4">
						<span className="block text-gray-700 mb-2">Mg Options</span>
						{mgOptions?.map((option, index) => (
							<div key={index} className="flex space-x-2 mb-2">
								<Input
									type="number"
									name="mg"
									className="mt-1 block w-1/2"
									placeholder="Mg"
									value={option.mg}
									onChange={(e) =>
										handleMgOptionChange(index, 'mg', Number(e.target.value))
									}
									required
								/>
								<Input
									type="number"
									name="price"
									className="mt-1 block w-1/2"
									placeholder="Price"
									value={option.price}
									onChange={(e) =>
										handleMgOptionChange(index, 'price', Number(e.target.value))
									}
									required
								/>
								<Button
									type="button"
									variant={'destructive'}
									onClick={() => handleRemoveMgOption(index)}
								>
									Remove
								</Button>
							</div>
						))}
						<Button
							type="button"
							variant={'ghost'}
							className="text-blue-500"
							onClick={handleAddMgOption}
						>
							Add Mg Option
						</Button>
					</div>

					<Button
						type="submit"
						className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
					>
						Update Product
					</Button>
				</>
			)}
		</form>
	);
};

export default UpdateProductPage;
