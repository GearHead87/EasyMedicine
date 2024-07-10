'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductDetails = ({ productId }) => {
	const { data, error } = useSWR(productId ? `/api/products/${productId}` : null, fetcher);
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(1);

	if (error) return <div>Failed to load product details</div>;
	if (!data) return <div>Loading...</div>;

	const { product } = data;

	console.log(product);

	const handleAddToCart = () => {
		dispatch(addToCart({ ...product, quantity }));
	};

	const handleShare = () => {
		const url = window.location.href;
		navigator.share({
			title: product.name,
			text: 'Check out this product!',
			url,
		});
	};

	return (
		<Card>
			{/* <CardHeader></CardHeader> */}
			<CardContent className="flex flex-col lg:flex-row gap-4">
				<Image
					src={product.image}
					alt={product.name}
					className="rounded-lg"
					width={300}
					height={300}
				/>
				<div className="space-y-5">
					<h2 className="text-2xl font-semibold">{product.name}</h2>
					<p>{product.description}</p>
					<p>Price: {product.price} ৳</p>
					<p className="text-lg">
						Categoty: <span className="font-semibold">{product.category.name}</span>
					</p>
					<div className=" flex justify-start items-center">
						<Button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
							-
						</Button>
						<Input
							type="number"
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
						/>
						<Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
					</div>
					<div className=" space-x-4">
						<Button onClick={handleAddToCart}>Add to Cart</Button>
						<Button onClick={handleShare}>Share</Button>
					</div>
				</div>
			</CardContent>
			<CardFooter className="space-x-3"></CardFooter>
		</Card>
	);
};

export default ProductDetails;
