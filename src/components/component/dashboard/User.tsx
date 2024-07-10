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

const User = () => {
	return (
		<>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
			<DropdownMenuItem><Link href={'/dashboard/order-details'}>Order History</Link> </DropdownMenuItem>
			{/* <DropdownMenuItem>Team</DropdownMenuItem> */}
			{/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
		</>
	);
};

export default User;
