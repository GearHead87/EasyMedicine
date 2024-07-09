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

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state?.cart?.items);
	const isInCart = cartItems?.some((item) => item.id === product.id);
	const isOutOfStock = product.stock === 0;

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(product));
	};

	return (
		<Card className={`w-full max-w-sm ${isOutOfStock ? 'opacity-50' : ''}`}>
			<CardHeader>
				<Image src={product.image} alt="Product" width={500} height={500}/>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{product.details}</p>
				<p>৳ {product.price}</p>
			</CardContent>
			<CardFooter>
				{isOutOfStock ? (
					<Button variant="destructive" disabled>
						Out of Stock
					</Button>
				) : isInCart ? (
					<Button variant="default" onClick={handleRemoveFromCart}>
						View Cart
					</Button>
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
