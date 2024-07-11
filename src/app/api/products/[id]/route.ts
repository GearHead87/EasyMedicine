// src/app/api/products/[id]/route.ts
import { deleteImage } from '@/lib/deleteImage';
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

		// Delete the product image
		await deleteImage(product.image);

		return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting product:', error);
		return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
	}
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const product = await prisma.product.findUnique({
			where: { id },
			include: { category: true, variants: true },
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		return NextResponse.json({ product }, { status: 200 });
	} catch (error) {
		console.error('Error fetching product:', error);
		return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const formData = await req.formData();
		console.log('PATCH IS calllingnnnn baby', formData);

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = parseFloat(formData.get('price') as string);
		const stock = parseInt(formData.get('stock') as string, 10);
		const categoryId = formData.get('categoryId') as string;
		const mgOptions = JSON.parse(formData.get('mgOptions') as string);
		const image = formData.get('image') as File;

		console.log(name, description, price);

		const productData: any = {
			name,
			description,
			price,
			stock,
			categoryId,
			variants: {
				create: mgOptions.map((option: { mg: number; price: number }) => ({
					mg: option.mg,
					price: option.price,
				})),
			},
		};

		if (image) {
			productData.image = image;
		}
		
		console.log(productData);

		const product = await prisma.product.update({
			where: { id },
			data: productData,
			include: {
				variants: true,
				category: true,
			},
		});

		return NextResponse.json({ product }, { status: 200 });
	} catch (error) {
		console.error('Error updating product:', error);
		return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
	}
}
