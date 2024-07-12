//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useSession } from 'next-auth/react';

interface OrderProps {
	id: string;
	status: string;
	totalAmount: number;
	orderItems: [];
}
interface ItemsProps {
	id: string;
	quantity: number;
	price: number;
	product: {
		name: string;
	};
}

const OrderDetails = () => {
	const { data: session, status } = useSession();
	const [orders, setOrders] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			if (!session) return;

			try {
				setLoadingOrders(true);
				const response = await fetch(`/api/orders?userId=${session?.user?.id}`);
				const ordersData = await response.json();
				setOrders(ordersData);
			} catch (error) {
				console.error('Error fetching orders:', error);
			} finally {
				setLoadingOrders(false);
			}
		};

		fetchOrders();
	}, [session]);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <div>Not authenticated. Please log in.</div>;
	}

	// const fetchOrders = async () => {
	// 	const response = await fetch(`/api/orders?userId=${session.user.id}`);
	// 	return await response.json();
	// };

	if (loadingOrders) {
		return <div>Loading orders...</div>;
	}

	if (!orders || orders.length === 0) {
		return <div>No orders found.</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader>
					<CardTitle>Order History</CardTitle>
				</CardHeader>
				<CardContent>
					{orders?.map((order: OrderProps) => (
						<Card key={order?.id} className="mb-4">
							<CardHeader>
								<CardTitle>Order Details</CardTitle>
								<CardDescription>Order ID: {order?.id}</CardDescription>
								<CardDescription>Status: {order?.status}</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead>Quantity</TableHead>
											<TableHead>Price</TableHead>
											<TableHead>Total</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{order?.orderItems?.map((item: ItemsProps) => (
											<TableRow key={item?.id}>
												<TableCell>{item?.product?.name}</TableCell>
												<TableCell>{item?.quantity}</TableCell>
												<TableCell>{item?.price} ৳</TableCell>
												<TableCell>
													{item.quantity * item.price} ৳
												</TableCell>
											</TableRow>
										))}
										<TableRow>
											<TableCell colSpan={3} style={{ textAlign: 'right' }}>
												Grand Total:
											</TableCell>
											<TableCell>{order?.totalAmount} </TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default OrderDetails;
