'use client';
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
import { signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
	const { data: session } = useSession();
	console.log(session);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
					Dashboard
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Admin />
					<User />
					<DropdownMenuSeparator />
					<p>Conditional</p>
					{session?.user?.role === 'USER' && <User />}
					{session?.user?.role === 'ADMIN' && <Admin />}
					<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default Dashboard;
