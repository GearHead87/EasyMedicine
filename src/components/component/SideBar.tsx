'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CategoryProps = {
	id: string;
	name: string;
	parentId?: string;
	subcategories: CategoryProps[];
};

const Sidebar = () => {
	const router = useRouter();
	const { data: categories, error, isLoading } = useGetCategoriesQuery({});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading categories</div>;

	const handleCategoryClick = (id: string) => {
		router.push(`/products/category/${id}`);
	};

	const renderCategories = (categories: CategoryProps[]) => {
		return categories.map((category) => (
			<AccordionItem key={category.id} value={`item-${category.id}`}>
				<AccordionTrigger>
					<div className="flex items-center">
						<Link href={`/products/category/${category.id}`}>{category.name}</Link>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					{category.subcategories && category.subcategories.length > 0 && (
						<ul className="ml-4">
							{category.subcategories.map((sub) => (
								<li key={sub.id} className="mb-2 hover:underline">
									<Link href={`/products/category/${sub.id}`}>{sub.name}</Link>
								</li>
							))}
						</ul>
					)}
				</AccordionContent>
			</AccordionItem>
		));
	};

	return (
		<div className="w-64 h-full bg-gray-100 p-4">
			<div className="flex items-center mb-4">
				<Heart className="text-red-500 mr-2" />
				<span className="font-bold">Favourites</span>
			</div>
			<Accordion type="multiple">
				{renderCategories(
					categories.filter((category: CategoryProps) => !category.parentId)
				)}
			</Accordion>
		</div>
	);
};

export default Sidebar;
