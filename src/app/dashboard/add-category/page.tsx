'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import useAxiosCommon from '@/hooks/useAxiosCommon';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Category = {
	id: string;
	name: string;
	parentId?: string;
	subcategories: Category[];
};

const CategoryPage = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [categoryName, setCategoryName] = useState('');
	const [parentId, setParentId] = useState<string | null>(null);

	const axiosCommon = useAxiosCommon();

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const { data } = await axiosCommon.get('/api/category');
			setCategories(data);
		} catch (e) {
			console.error(e);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const categoryData = {
			name: categoryName,
			parentId,
		};

		try {
			const { data } = await axiosCommon.post('/api/category', categoryData);
			fetchCategories(); // Refresh categories after adding
			setCategoryName('');
			setParentId(null);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDelete = async (categoryId: string) => {
		try {
			await axiosCommon.delete('/api/category', { data: { id: categoryId } });
			fetchCategories(); // Refresh categories after deletion
		} catch (e) {
			console.error(e);
		}
	};

	const renderCategories = (categories: Category[]) => {
		return categories.map((category) => (
			<div key={category.id} className="mb-2">
				<p className="font-semibold flex justify-between items-center">
					{category.name}
					<Button
						variant="destructive"
						onClick={() => handleDelete(category.id)}
						className="ml-4"
					>
						Delete
					</Button>
				</p>
				{category.subcategories && category.subcategories.length > 0 && (
					<div className="ml-4">{renderCategories(category.subcategories)}</div>
				)}
			</div>
		));
	};

	return (
		<div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
			<h1 className="text-2xl font-bold mb-4">Categories</h1>

			<div className="mb-4">
				{renderCategories(categories.filter((category) => !category.parentId))}
			</div>

			<form onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="Category Name">Category Name</Label>
					<Input
						type="text"
						name="categoryName"
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						required
					/>
				</div>

				<div>
					<Label htmlFor="Parent Category">Parent Category (optional)</Label>
					<Select
						value={parentId || ''}
						onValueChange={(value) => setParentId(value || null)}
					>
						<SelectTrigger >
							<SelectValue placeholder="None" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="None">None</SelectItem>
							{categories
								.filter((category) => !category.parentId)
								.map((category) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

				{/* <div>
          <Label htmlFor="Parent Category">Parent Category (optional)</Label>
          <select
            name="parentCategory"
            value={parentId || ''}
            onChange={(e) => setParentId(e.target.value || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">None</option>
            {categories.filter(category => !category.parentId).map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div> */}

				<Button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mt-4"
				>
					Add Category
				</Button>
			</form>
		</div>
	);
};

export default CategoryPage;
