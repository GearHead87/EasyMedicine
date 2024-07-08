import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Admin = () => {
	return (
		<>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Add Product</DropdownMenuItem>
			<DropdownMenuItem>View All Product</DropdownMenuItem>
			<DropdownMenuItem>Team</DropdownMenuItem>
			<DropdownMenuItem>Subscription</DropdownMenuItem>
		</>
	);
};

export default Admin;
