import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		// Extract pagination parameters from the query string
		const { searchParams } = new URL(req.url);
		const page = searchParams.get('page') || '1';
		const limit = searchParams.get('limit') || '10';
		const categoryId = searchParams.get('categoryId');
		const searchQuery = searchParams.get('search') || '';

		// Convert query string values to integers
		const pageNumber = parseInt(page);
		const limitNumber = parseInt(limit);

		// Calculate the number of items to skip
		const skip = (pageNumber - 1) * limitNumber;

		// // Define the where clause based on the categoryId
		// const where = categoryId ? { categoryId } : { };

		// Define the where clause based on the categoryId and searchQuery
		const where = {
			...(categoryId && { categoryId }),
			...(searchQuery && {
				name: {
					contains: searchQuery,
					mode: 'insensitive',
				},
			}),
		};

		// Fetch products from the database
		const products = await prisma.product.findMany({
			where,
			skip,
			take: limitNumber,
			include: {
				category: true,
				variants: true,
			},
		});

		// Get the total count of products
		const totalProducts = await prisma.product.count({ where });

		// Return the products and pagination info
		return NextResponse.json({
			products,
			pagination: {
				total: totalProducts,
				page: pageNumber,
				limit: limitNumber,
				totalPages: Math.ceil(totalProducts / limitNumber),
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'An error occurred while fetching products.' },
			{ status: 500 }
		);
	}
}
