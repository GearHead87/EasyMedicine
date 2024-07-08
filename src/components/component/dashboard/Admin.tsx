import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const Admin = () => {
	return (
		<>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<Link href={'/add-product'}>Add Product</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>View All Product</DropdownMenuItem>
			<DropdownMenuItem>
				<Link href={'manage-category'}>Manage Category</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>Subscription</DropdownMenuItem>
		</>
	);
};

export default Admin;
