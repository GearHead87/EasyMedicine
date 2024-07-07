import { SignUpForm } from '@/components/component/SignUpForm';
import Link from 'next/link';
import React from 'react';

const SignUpPage = () => {
	return (
		<div className="mx-auto max-w-md space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Register</h1>
				<p className="text-muted-foreground">Create your account to get started.</p>
			</div>
			<SignUpForm />
			<p className="text-muted-foreground">Already Have an account? <Link className='font-bold' href={'signin'}>Sign In</Link></p>
		</div>
	);
};

export default SignUpPage;
