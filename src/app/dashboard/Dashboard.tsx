import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import User from '@/components/component/dashboard/User';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Admin from '@/components/component/dashboard/Admin';
import { signOut } from 'next-auth/react';

const Dashboard = ({ data }) => {
	console.log(data?.user);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
					Dashboard
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Admin />
					<User />
					<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
				{/* {data?.user?.role === 'USER' && <User />} */}
				{/* {data?.user?.role === 'ADMIN' && <Admin />} */}
			</DropdownMenu>
		</>
	);
};

export default Dashboard;
