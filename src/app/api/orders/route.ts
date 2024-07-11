import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface ItemsProps {
	id: string
	quantity: number
	price: number
}

export async function POST(req: NextRequest) {
	try {
		const { userId, items, totalAmount } = await req.json();

		const createdOrder = await prisma.order.create({
			data: {
				userId,
				totalAmount,
				status: 'PENDING',
				// shippingAddressId,
				orderItems: {
					create: items.map((item:ItemsProps) => ({
						productId: item.id,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
			include: {
				orderItems: true,
			},
		});

		// Decrease product stock
		await Promise.all(
			items.map(async (item:ItemsProps) => {
				await prisma.product.update({
					where: { id: item.id },
					data: { stock: { decrement: item.quantity } },
				});
			})
		);

		return NextResponse.json(createdOrder, { status: 201 });
	} catch (error) {
		console.error('Error placing order:', error);
		return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');
		// const { userId } = req.query;
		console.log(userId);

		let orders;
		if (userId) {
			// Retrieve orders for a specific user
			orders = await prisma.order.findMany({
				where: {
					userId: userId.toString(),
				},
				include: {
					orderItems: {
						include: {
							product: true,
						},
					},
					// shippingAddress: true, // Include if needed
				},
			});
		} else {
			// Retrieve all orders in the database
			orders = await prisma.order.findMany({
				include: {
					orderItems: {
						include: {
							product: true,
						},
					},
					// shippingAddress: true, // Include if needed
				},
			});
		}

		return NextResponse.json(orders, { status: 200 });
	} catch (error) {
		console.error('Error fetching orders:', error);
		return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
	}
}
