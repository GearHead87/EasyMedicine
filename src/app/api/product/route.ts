import { imageUpload } from '@/lib/imageUpload';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = parseFloat(formData.get('price') as string);
		const stock = parseInt(formData.get('stock') as string);
		const categoryId = formData.get('categoryId') as string;
		const mgOptions = JSON.parse(formData.get('mgOptions') as string);
		const image = formData.get('image') as File;

		const imageUrl = await imageUpload({ image });

		if (!imageUrl) {
			return NextResponse.json({ error: 'No image provided' }, { status: 400 });
		}

		const product = await prisma.product.create({
			data: {
				name,
				description,
				image: imageUrl,
				price,
				stock,
				categoryId,
				variants: {
					create: mgOptions.map((option: { mg: number; price: number }) => ({
						mg: option.mg,
						price: option.price,
					})),
				},
			},
			include: {
				variants: true,
			},
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error) {
		console.error('Error adding product:', error);
		return NextResponse.json({ error: 'Failed to add product.' }, { status: 500 });
	}
}
