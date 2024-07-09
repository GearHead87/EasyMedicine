import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '@/redux/features/cart/cartSlice' 
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

const CartDropdown = () => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state?.cart?.items);
	console.log(cartItems);

	const handleRemove = (id) => {
		dispatch(removeFromCart({ id }));
	};

	const handleIncrease = (item) => {
		dispatch(increaseQuantity(item));
	};

	const handleDecrease = (item) => {
		dispatch(decreaseQuantity(item));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Cart ({cartItems?.length})</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80">
				<DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{cartItems?.length > 0 ? (
					cartItems?.map((item) => (
						<DropdownMenuItem
							key={item.id}
							className="flex items-center justify-between"
						>
							<div className="flex flex-col">
								<span>{item.name}</span>
								<span>{item.price} ৳</span>
								<div className="flex items-center space-x-2">
									<Button onClick={() => handleDecrease(item)}>-</Button>
									<span>{item.quantity}</span>
									<Button onClick={() => handleIncrease(item)}>+</Button>
								</div>
							</div>
							<Button variant="destructive" onClick={() => handleRemove(item.id)}>
								Delete
							</Button>
						</DropdownMenuItem>
					))
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
