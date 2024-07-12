//@ts-nocheck
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAxiosCommon from '@/hooks/useAxiosCommon';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export const SignUpForm = () => {
	const router = useRouter();
	const axiosCommon = useAxiosCommon();
	const formSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		try {
			const { data } = await axiosCommon.post('/api/signup', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			toast("Sign up successful")
			router.push('/')
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div>
			<form onSubmit={formSubmit} className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Enter your name"
						required
					/>
				</div>
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
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="picture">Picture</Label>
					<Input id="image" name="image" type="file" />
				</div>
				<Button type="submit" className="w-full">
					Register
				</Button>
			</form>
		</div>
	);
};
