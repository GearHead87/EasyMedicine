import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import NavMain from '@/components/shared/NavMain';
import ReduxProvider from '@/components/provider/ReduxProvider';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<ReduxProvider>
					<NavMain>
						<div className="container mx-auto">{children}</div>
					</NavMain>
				</ReduxProvider>
			</body>
		</html>
	);
}
