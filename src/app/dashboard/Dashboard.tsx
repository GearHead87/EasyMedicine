//@ts-nocheck
'use client';
import Admin from '@/components/component/dashboard/Admin';
import User from '@/components/component/dashboard/User';
import { buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
	const { data: session } = useSession();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
					Dashboard
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{session?.user?.role === 'ADMIN' && <Admin />}
					{session?.user?.role === 'USER' && <User />}
					{/* <Admin />
					<User /> */}
					<DropdownMenuSeparator />
					{/* <p>Conditional</p> */}
					<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default Dashboard;
