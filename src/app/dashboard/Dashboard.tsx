'use client';
import Admin from '@/components/component/dashboard/Admin';
import User from '@/components/component/dashboard/User';
import { buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
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
