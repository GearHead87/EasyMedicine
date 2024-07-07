"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';

const SignInForm = () => {
	const formSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const res = await signIn('credentials', {
			email: form.email.value,
			password: form.password.value,
			redirect: true,
			callbackUrl: '/',
		});
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
				<Button type="submit" className="w-full">
					Register
				</Button>
			</form>
		</div>
	);
};

export default SignInForm;
