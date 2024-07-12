//@ts-nocheck
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
import {
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from '@/redux/services/categoriesApi';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

type CategoryProps = {
	id: string;
	name: string;
	parentId?: string;
	subcategories: CategoryProps[];
};

const CategoryPage = () => {
	const { data: session, status } = useSession();
	const { data: categories = [], isLoading, error } = useGetCategoriesQuery({});
	const [addCategory] = useAddCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();

	const [categoryName, setCategoryName] = useState('');
	const [parentId, setParentId] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const categoryData = {
			name: categoryName,
			parentId,
		};

		try {
			await addCategory(categoryData).unwrap();
			setCategoryName('');
			setParentId(null);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDelete = async (categoryId: string) => {
		try {
			await deleteCategory(categoryId).unwrap();
			toast("Deleted Successfully")
		} catch (e) {
			console.error(e);
		}
	};

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session || session?.user?.role !== 'ADMIN') {
		return <div>Unauthorized access.</div>;
	}

	if(isLoading){
		return <div>Loading ....</div>
	}

	const renderCategories = (categories: CategoryProps[]) => {
		return categories.map((category) => (
			<div key={category.id} className="mb-2 space-y-2">
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
				{renderCategories(
					categories.filter((category: CategoryProps) => !category.parentId)
				)}
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
						<SelectTrigger>
							<SelectValue placeholder="None" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="None">None</SelectItem>
							{categories
								.filter((category: CategoryProps) => !category.parentId)
								.map((category: CategoryProps) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

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
