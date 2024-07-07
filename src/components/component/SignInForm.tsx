import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const SignInForm = () => {
	return (
		<div>
			<form className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" className="w-full">
					Register
				</Button>
			</form>
		</div>
	);
};

export default SignInForm;
