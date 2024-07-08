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
				</DropdownMenuContent>
				{/* {data?.user?.role === 'USER' && <User />} */}
				{/* {data?.user?.role === 'ADMIN' && <Admin />} */}
			</DropdownMenu>
		</>
	);
};

export default Dashboard;
