'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { emptyCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';

interface Product {
	id: string;
	price: number;
	quantity: number;
}

const calculateTotalPrice = (items: Product[]) => {
	return items.reduce((total: number, item: Product) => total + item.price * item.quantity, 0);
};

const CheckoutPage = () => {
	const cartItems = useAppSelector((state) => state?.cart?.items);
	const dispatch = useAppDispatch();
	const { data: session } = useSession();
	const handleCheckout = async () => {
		// @ts-ignore
		if (!session?.user?.id) {
			toast('You must login to place order');
			console.error('User is not authenticated');
			return;
		}

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					// @ts-ignore
					userId: session.user?.id,
					items: cartItems,
					totalAmount: calculateTotalPrice(cartItems),
				}),
			});

			if (response.ok) {
				const order = await response.json();
				toast('Order Placed Successfully');
				dispatch(emptyCart());
			} else {
				console.error('Failed to place order');
			}
		} catch (error) {
			console.error('Error placing order:', error);
		}
	};
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Checkout</h1>
			<Card className="mb-4">
				<CardHeader>
					<h2 className="text-xl font-bold">Order Summary</h2>
				</CardHeader>
				<CardContent>
					{cartItems.length === 0 ? (
						<p>Your cart is empty</p>
					) : (
						cartItems.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between gap-2 mb-4"
							>
								<Image
									src={item.image}
									alt="Product"
									className="rounded-lg"
									width={100}
									height={100}
								/>
								<div>
									<h3 className="font-semibold">{item.name}</h3>
									<p>Quantity: {item.quantity}</p>
									<p>Price: {item.price} ৳</p>
								</div>
								<div>
									<p>Total: {item.price * item.quantity} ৳</p>
								</div>
							</div>
						))
					)}
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="font-bold">Total Amount:</div>
					<div className="font-bold">{calculateTotalPrice(cartItems)} ৳</div>
				</CardFooter>
			</Card>
			<Card className="mb-4">
				<CardHeader>
					<h2 className="text-xl font-bold">Payment Method</h2>
				</CardHeader>
				<CardContent>
					<Label htmlFor="payment-method">Select Payment Method</Label>
					<select id="payment-method" className="w-full mt-2 p-2 border rounded">
						<option value="cod" selected>
							Cash on Delivery
						</option>
					</select>
				</CardContent>
			</Card>
			{cartItems.length === 0 ? (
				<Button className="w-full" disabled>
					Place Order
				</Button>
			) : (
				<Button onClick={handleCheckout} className="w-full">
					Place Order
				</Button>
			)}
		</div>
	);
};

export default CheckoutPage;
