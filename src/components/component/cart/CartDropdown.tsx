import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	CartItem,
} from '@/redux/features/cart/cartSlice';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const CartDropdown = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state?.cart?.items);
	const { data: session } = useSession();

	const handleRemove = (id: string) => {
		dispatch(removeFromCart({ id }));
	};

	const handleIncrease = (item: CartItem) => {
		dispatch(increaseQuantity(item));
	};

	const handleDecrease = (item: CartItem) => {
		dispatch(decreaseQuantity(item));
	};

	const handleCheckout = async () => {
		if (!session?.user?.id) {
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
					userId: session.user?.id,
					items: cartItems,
					totalAmount: calculateTotalPrice(),
				}),
			});

			if (response.ok) {
				const order = await response.json();
				// router.push(`/order-details/${order.id}`);
			} else {
				console.error('Failed to place order');
			}
		} catch (error) {
			console.error('Error placing order:', error);
		}
	};

	const calculateTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{/* Cart ({cartItems?.length}) */}
					<ShoppingCartIcon className="w-6 h-6" />
					<span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
						{cartItems?.length}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-xl min-w-80">
				<DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{cartItems?.length > 0 ? (
					<>
						{cartItems.map((item) => (
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								key={item.id}
								className="flex items-center justify-between"
							>
								<div className="flex gap-2">
									<div>
										<Image
											src={item.image}
											alt="Product"
											className="rounded-lg"
											width={100}
											height={100}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<span>{item.name}</span>
										<span>{item.price} ৳</span>
										<div className="flex items-center space-x-2">
											<Button onClick={() => handleDecrease(item)}>-</Button>
											<span>{item.quantity}</span>
											<Button onClick={() => handleIncrease(item)}>+</Button>
										</div>
									</div>
								</div>
								<Button variant="destructive" onClick={() => handleRemove(item.id)}>
									Delete
								</Button>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<div className="flex justify-between px-4 py-2">
							<span>Total:</span>
							<span>{calculateTotalPrice()} ৳</span>
						</div>
						<div className="flex justify-center p-4">
							<Button className="w-full">
								<Link href={'/checkout'}>Proceed to Checkout</Link>
							</Button>
						</div>
					</>
				) : (
					<DropdownMenuItem>
						<p className="text-center w-full">Cart is empty</p>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CartDropdown;
