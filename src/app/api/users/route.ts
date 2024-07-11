import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const searchQuery = searchParams.get('search') || '';
		const page = parseInt(searchParams.get('page') || '1', 10);
		const limit = parseInt(searchParams.get('limit') || '10', 10);

		const skip = (page - 1) * limit;

		const where = searchQuery
			? {
					OR: [
						{ name: { contains: searchQuery, mode: 'insensitive' } },
						{ email: { contains: searchQuery, mode: 'insensitive' } },
					],
			  }
			: {};

		const users = await prisma.user.findMany({
			where,
			skip,
			take: limit,
		});

		const totalUsers = await prisma.user.count({ where });

		return NextResponse.json({
			users,
			pagination: {
				total: totalUsers,
				page,
				limit,
				totalPages: Math.ceil(totalUsers / limit),
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'An error occurred while fetching users.' },
			{ status: 500 }
		);
	}
}
