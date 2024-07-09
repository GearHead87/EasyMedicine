// src/app/api/products/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	console.log('This is api from delete ->', id);

	try {
		// Check if the product exists
		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				variants: true,
				cartItems: true,
				orderItems: true,
			},
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Delete the product
		const res = await prisma.product.delete({
			where: { id },
		});
    console.log('delete Product=>', res);
		return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting product:', error);
		return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
	}
}
