import Dashboard from '@/app/dashboard/Dashboard';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HospitalIcon, MapPinIcon, MenuIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
	toggleSidebar: MouseEventHandler<HTMLButtonElement>;
};

const NavBar = ({ toggleSidebar }: Props) => {
	const data = useSession();
	// console.log(data);
	return (
		<>
			<header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
				<Button variant="ghost" size="icon" onClick={toggleSidebar}>
					<MenuIcon className="w-6 h-6" />
				</Button>
				<div className="flex items-center ml-4">
					<HospitalIcon className="w-6 h-6 text-primary" />
					<span className="ml-2 text-2xl font-bold text-primary">Medicine</span>
				</div>
				<form className="flex-1 ml-auto">
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search Your medicine / ঔষধ ও পণ্য সার্চ করুন"
							className="pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]"
						/>
					</div>
				</form>
				<div className="flex items-center ml-4 space-x-4">
					<div className="flex items-center">
						<MapPinIcon className="w-6 h-6 text-muted-foreground" />
						<span className="ml-1 text-sm">Sirajganj</span>
					</div>
					<Button variant="ghost" size="icon" className="relative">
						<ShoppingCartIcon className="w-6 h-6" />
						<span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
							4
						</span>
					</Button>
					{data?.status === 'loading' ? (
						<button className={cn(buttonVariants({ variant: 'outline' }))} disabled>
							Loading...
						</button>
					) : data?.status === 'authenticated' ? (
						<Dashboard data={data} />
					) : (
						<Link
							href={'/signin'}
							className={cn(buttonVariants({ variant: 'outline' }))}
						>
							Login / Sign up
						</Link>
					)}
					{/* <Link href={'/signin'} className={cn(buttonVariants({ variant: 'outline' }))}>
						Login / Sign up
					</Link> */}
				</div>
			</header>
		</>
	);
};

export default NavBar;
