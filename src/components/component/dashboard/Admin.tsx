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
				<Link href={'/dashboard/add-product'}>Add Product</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Link href={'/dashboard/manage-product'}>Manage Product</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Link href={'/dashboard/manage-category'}>Manage Category</Link>
			</DropdownMenuItem>
			<DropdownMenuItem><Link href={'/dashboard/manage-orders'}>Manage Order</Link></DropdownMenuItem>
		</>
	);
};

export default Admin;
