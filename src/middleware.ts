//@ts-nocheck
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const getToken = (request) => {
	// Try to get the secure token first
	let token = cookies(request).get('__Secure-next-auth.session-token');

	// If the secure token is not found, try the non-secure token
	if (!token) {
		token = cookies(request).get('next-auth.session-token');
	}

	return token;
};

export const middleware = async (request) => {
	const token = getToken(request);

	const pathname = request.nextUrl.pathname;
	if (pathname.includes('api')) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL(`/signin?redirect=${pathname}`, request.url));
	}
	return NextResponse.next();
};

export const config = {
	matcher: ['/dashboard/:path*', '/checkout'],
};
