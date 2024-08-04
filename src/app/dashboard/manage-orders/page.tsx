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
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

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

const AdminOrdersPage = () => {
	const { data: session, status } = useSession();
	const [orders, setOrders] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(true);
	const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoadingOrders(true);
				const response = await fetch('/api/orders');
				const ordersData = await response.json();
				setOrders(ordersData);
			} catch (error) {
				console.error('Error fetching orders:', error);
			} finally {
				setLoadingOrders(false);
			}
		};

		fetchOrders();
	}, [refetch]);

	const handleChangeStatus = async (orderId: string, status: string) => {
		try {
			const response = await fetch(`/api/orders/${orderId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status }),
			});
			if (response.ok) {
				const updatedOrder = await response.json();
				const updatedOrders = orders.map((order: OrderProps) =>
					order.id === updatedOrder.id ? updatedOrder : order
				);
				setOrders(updatedOrders as never);
				toast('Status Updated');
				setRefetch(!refetch);
			} else {
				console.error('Failed to update order status');
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session || session?.user?.role !== 'ADMIN') {
		return <div>Unauthorized access.</div>;
	}

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
					<CardTitle>Orders List</CardTitle>
				</CardHeader>
				<CardContent>
					{orders.map((order: OrderProps) => (
						<Card key={order.id} className="mb-4">
							<CardHeader>
								<CardTitle>Order Details</CardTitle>
								<CardDescription>Order ID: {order.id}</CardDescription>
								<CardDescription>Status: {order.status}</CardDescription>
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
										{order.orderItems.map((item: ItemsProps) => (
											<TableRow key={item.id}>
												<TableCell>{item?.product?.name}</TableCell>
												<TableCell>{item.quantity}</TableCell>
												<TableCell>{item.price} ৳</TableCell>
												<TableCell>
													{item.quantity * item.price} ৳
												</TableCell>
											</TableRow>
										))}
										<TableRow>
											<TableCell colSpan={3} style={{ textAlign: 'right' }}>
												Grand Total:
											</TableCell>
											<TableCell>{order.totalAmount} ৳</TableCell>
										</TableRow>
									</TableBody>
								</Table>
								<div className="mt-4">
									<Button
										onClick={() => handleChangeStatus(order.id, 'PENDING')}
										className="mr-2"
									>
										Mark as Pending
									</Button>
									<Button
										onClick={() => handleChangeStatus(order.id, 'SHIPPED')}
										className="mr-2"
									>
										Mark as Shipped
									</Button>
									<Button
										onClick={() => handleChangeStatus(order.id, 'DELIVERED')}
										className="mr-2"
									>
										Mark as Delivered
									</Button>
									<Button
										onClick={() => handleChangeStatus(order.id, 'CANCELLED')}
										className="mr-2"
									>
										Cancel Order
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminOrdersPage;
