import SignInForm from '@/components/component/SignInForm';
import Link from 'next/link';
import React from 'react';

const SignInPage = () => {
	return (
		<div className="mx-auto max-w-md space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Sign in</h1>
				<p className="text-muted-foreground">Sign in to get started.</p>
			</div>
			<SignInForm />
			<p className="text-muted-foreground">No Account? <Link className='font-bold' href={'signup'}>Sign Up</Link></p>
		</div>
	);
};

export default SignInPage;
