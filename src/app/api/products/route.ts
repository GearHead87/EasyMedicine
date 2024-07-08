import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// pages/api/products.ts
export async function GET(req: NextRequest) {
	try {
		// Extract pagination parameters from the query string
		const { searchParams } = new URL(req.url);
		const page = searchParams.get('page') || '1';
		const limit = searchParams.get('limit') || '10';

		// Convert query string values to integers
		const pageNumber = parseInt(page);
		const limitNumber = parseInt(limit);

		// Calculate the number of items to skip
		const skip = (pageNumber - 1) * limitNumber;

		// Fetch products from the database
		const products = await prisma.product.findMany({
			skip,
			take: limitNumber,
			include: {
				category: true,
				variants: true,
			},
		});

		// Get the total count of products
		const totalProducts = await prisma.product.count();

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
