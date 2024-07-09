import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const orderId = params.id;
	console.log(orderId);

	const { status } = await req.json();
	console.log(status);
	try {
		const updatedOrder = await prisma.order.update({
			where: { id: orderId },
			data: {
				status,
			},
		});
		return NextResponse.json({ updatedOrder });
	} catch (error) {
		console.error('Error updating order status:', error);
		return NextResponse.json({ error: 'Failed to update order status' });
	}
}
