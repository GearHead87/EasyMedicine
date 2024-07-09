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
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi';
import React, { useState } from 'react';

const AddProductPage = () => {
	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [categoryId, setCategoryId] = useState('');
	const [mgOptions, setMgOptions] = useState<Array<{ mg: number; price: number }>>([
		{ mg: 0, price: 0 },
	]);
	const [image, setImage] = useState<File | null>(null);

	const { data: categories, error, isLoading } = useGetCategoriesQuery({});

	const axiosCommon = useAxiosCommon();

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

		const productData = {
			name: productName,
			description,
			price,
			stock,
			categoryId,
			mgOptions,
			image,
		};

		const formData = new FormData();
		formData.append('name', productData.name);
		formData.append('description', productData.description);
		formData.append('price', productData.price.toString());
		formData.append('stock', productData.stock.toString());
		formData.append('categoryId', productData.categoryId);
		formData.append('mgOptions', JSON.stringify(productData.mgOptions));
		if (productData.image) {
			formData.append('image', productData.image);
		}

		try {
			const { data } = await axiosCommon.post('/api/product', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
			<h1 className="text-2xl font-bold mb-4">Add New Product</h1>

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
				<Label htmlFor="Description">Description </Label>
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

			{/* <div>
				<Label htmlFor="Category ID">Category ID</Label>
				<Input
					type="text"
					name="category"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
					required
				/>
			</div> */}

			<div>
				<Label htmlFor="Category ID">Category</Label>
				<Select onValueChange={(value) => setCategoryId(value)}>
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
								<SelectItem key={category.id} value={category.id}>
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
					required
				/>
			</div>

			<div className="mb-4">
				<span className="block text-gray-700 mb-2">Mg Options</span>
				{mgOptions.map((option, index) => (
					<div key={index} className="flex space-x-2 mb-2">
						<Input
							type="number"
							name="mg"
							className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
							className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
				Add Product
			</Button>
		</form>
	);
};

export default AddProductPage;
