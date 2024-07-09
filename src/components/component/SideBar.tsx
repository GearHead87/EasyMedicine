'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi';
import { Heart } from 'lucide-react';

const Sidebar = () => {
	const { data: categories, error, isLoading } = useGetCategoriesQuery({});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading categories</div>;

	const renderCategories = (categories) => {
		return categories.map((category) => (
			<AccordionItem key={category.id} value={`item-${category.id}`}>
				<AccordionTrigger>
					<div className="flex items-center">{category.name}</div>
				</AccordionTrigger>
				<AccordionContent>
					{category.subcategories && category.subcategories.length > 0 && (
						<ul className="ml-4">
							{category.subcategories.map((sub) => (
								<li key={sub.id} className="mb-2">
									{sub.name}
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
				<Heart className='text-red-500 mr-2' />
				<span className="font-bold">Favourites</span>
			</div>
			<Accordion type="multiple" collapsible>
				{renderCategories(categories.filter((category) => !category.parentId))}
			</Accordion>
		</div>
	);
};

export default Sidebar;
