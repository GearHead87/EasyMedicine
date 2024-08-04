//@ts-nocheck
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '../ui/loadingSpinner';

const SignInForm = () => {
	const searchParams = useSearchParams();
	const path = searchParams.get('redirect');
	const [formLoading, setFormLoading] = useState(false);

	const formSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
		e.preventDefault();
		setFormLoading(true);

		const form = e.target;
		try {
			const res = await signIn('credentials', {
				email: form.email.value,
				password: form.password.value,
				redirect: true,
				callbackUrl: path ? path : '/',
			});
			toast('Sign in successful');
			setFormLoading(false);
		} catch (e) {
			setFormLoading(false);
			toast('Credentials Incorrect');
			console.log(e);
		}
	};
	return (
		<div>
			<form onSubmit={formSubmit} className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="m@example.com"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter Your Password"
						required
					/>
				</div>
				{formLoading ? (
					<Button type="submit" className="w-full opacity-70 cursor-not-allowed" disabled>
						<LoadingSpinner />
					</Button>
				) : (
					<Button type="submit" className="w-full">
						Sign in
					</Button>
				)}
			</form>
		</div>
	);
};

export default SignInForm;
