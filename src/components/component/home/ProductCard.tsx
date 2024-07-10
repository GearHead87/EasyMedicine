import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/features/cart/cartSlice';
import Image from 'next/image';
import CartDropdown from '../cart/CartDropdown';
import Link from 'next/link';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state?.cart?.items);
	const isInCart = cartItems?.some((item) => item.id === product.id);
	const isOutOfStock = product.stock === 0;
	// console.log(product);

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(product));
	};

	return (
		<Card className={`w-full mx-auto max-w-lg ${isOutOfStock ? 'opacity-50' : ''}`}>
			<Link href={`products/${product.id}`}>
				<CardHeader>
					<Image src={product.image} alt="Product" className='rounded-lg object-cover w-80 h-80' width={500} height={500} />
					<CardTitle>{product.name}</CardTitle>
					<CardDescription>{product.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Category: <span className='font-semibold'> {product.category.name}</span></p>
					<p>Price: <span className='font-semibold'>{product.price} ৳</span></p>
				</CardContent>
			</Link>
			<CardFooter>
				{isOutOfStock ? (
					<Button variant="destructive" disabled>
						Out of Stock
					</Button>
				) : isInCart ? (
					<Button variant="default">View Cart(notworking)</Button>
				) : (
					<Button variant="default" onClick={handleAddToCart}>
						Add to Cart
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
