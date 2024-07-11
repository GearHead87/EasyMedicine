import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	CartItem,
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
} from '@/redux/features/cart/cartSlice';
import {
	closeCartDropdown,
	openCartDropdown,
} from '@/redux/features/cartDropdown/cartDropdownSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ShoppingCartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const CartDropdown = () => {
	const router = useRouter();
	const isOpen = useAppSelector((state) => state.cartDropdown.isOpen);
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state?.cart?.items);
	const { data: session } = useSession();
	const dropdownRef = useRef(null);

	const handleRemove = (id: string) => {
		dispatch(removeFromCart({ id }));
	};

	const handleIncrease = (item: CartItem) => {
		dispatch(increaseQuantity(item));
	};

	const handleDecrease = (item: CartItem) => {
		dispatch(decreaseQuantity(item));
	};

	const calculateTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};


	// useEffect(() => {
	// 	const handleClickOutside = (event: React.SyntheticEvent<EventTarget>) => {
	// 		if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
	// 			dispatch(closeCartDropdown());
	// 		}
	// 	};

	// 	if (isOpen) {
	// 		document.addEventListener('mousedown', handleClickOutside);
	// 	} else {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	}

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, [isOpen, dispatch]);

	return (
		<DropdownMenu
			open={isOpen}
			onOpenChange={(open) =>
				open ? dispatch(openCartDropdown()) : dispatch(closeCartDropdown())
			}
		>
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
