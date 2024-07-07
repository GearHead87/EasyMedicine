import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 3600,
	},
	// adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: 'Sign In',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					return null;
				}
				const isPasswordValid = await compare(credentials.password, user.password);
				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user.id + '',
					name: user.name,
					email: user.email,
					image: user.image,
					role: user.role
				};
				// End
			},
		}),
	],
	// pages:{
	//   signIn: '/sign-in'
	// }
	callbacks: {
		session: ({ session, token }) => {
			console.log('Session Callback', { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
		jwt: ({ token, user }) => {
			console.log('JWT Callback', { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

