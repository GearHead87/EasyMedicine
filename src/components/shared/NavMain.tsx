'use client';
import { useState } from 'react';
import SideBar from '../component/SideBar';
import NavBar from '../component/NavBar';

type Props = {
	children: React.ReactNode;
};

export default function NavMain({ children }: Props) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className="flex flex-col w-full min-h-screen relative">
			<NavBar toggleSidebar={toggleSidebar} />
			<div className="flex flex-1">
				{isSidebarOpen && <SideBar />}
				{/* <main className="flex-1 p-4" /> */}
				<div className="mt-10 p-4 mx-auto">{children}</div>
			</div>
		</div>
	);
}
