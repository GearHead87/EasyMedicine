import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDownIcon, HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';

const SideBar = () => {
	return (
		<aside className="w-64 p-4 border-r">
			<div className="flex items-center mb-4">
				<HeartIcon className="w-5 h-5 text-red-500" />
				<span className="ml-2 text-lg font-semibold">Favourites</span>
			</div>
			<div className="space-y-2">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">Common Conditions</CardTitle>
						<ChevronDownIcon className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							<Button variant="ghost" className="w-full text-left">
								Blood Pressure & Heart
							</Button>
							<Button variant="ghost" className="w-full text-left">
								Heart Disease
							</Button>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">
							Blood Pressure & Heart
						</CardTitle>
						<ChevronDownIcon className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							<Button variant="ghost" className="w-full text-left">
								Blood Pressure
							</Button>
							<Button variant="ghost" className="w-full text-left">
								Heart Disease
							</Button>
							<Button variant="ghost" className="w-full text-left">
								Cholesterol
							</Button>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">Cholesterol</CardTitle>
						<ChevronDownIcon className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							<Button variant="ghost" className="w-full text-left">
								High Cholesterol
							</Button>
							<Button variant="ghost" className="w-full text-left">
								Low Cholesterol
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</aside>
	);
};

export default SideBar;
