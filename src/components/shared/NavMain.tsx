'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import SideBar from '../component/SideBar';
import { HospitalIcon, MapPinIcon, MenuIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';

export default function NavMain({ children }) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className="flex flex-col w-full min-h-screen relative">
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
					<Link href={'/signin'} className={cn(buttonVariants({ variant: 'outline' }))}>
						Login / Sign up
					</Link>
				</div>
			</header>
			<div className="flex flex-1">
				{isSidebarOpen && <SideBar />}
				{/* <main className="flex-1 p-4" /> */}
			</div>
			<div className="mt-10 p-4">{children}</div>
		</div>
	);
}

