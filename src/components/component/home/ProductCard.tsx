import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { openCartDropdown } from '@/redux/features/cartDropdown/cartDropdownSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart, removeFromCart } from '../../../redux/features/cart/cartSlice';

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	categoryId: string;
	image: string;
	category?: {
		name: string;
	};
	// variants: MgOption[];
}

const ProductCard = ({ product }: { product: Product }) => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state?.cart?.items);
	const isInCart = cartItems?.some((item) => item.id === product.id);
	const isOutOfStock = product.stock === 0;
	// console.log(product);

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(product));
	};

	const handleViewCart = () => {
		dispatch(openCartDropdown());
	};

	return (
		<Card className={`w-full mx-auto max-w-lg ${isOutOfStock ? 'opacity-50' : ''}`}>
			<Link href={`/products/${product.id}`}>
				<CardHeader>
					<Image
						src={product.image}
						alt="Product"
						className="rounded-lg object-cover w-80 h-80"
						width={500}
						height={500}
					/>
					<CardTitle>{product.name}</CardTitle>
					<CardDescription>{product.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						{/* @ts-ignore */}
						Category: <span className="font-semibold"> {product.category.name}</span>
					</p>
					<p>
						Stock: <span className="font-semibold"> {product.stock}</span>
					</p>
					<p>
						Price: <span className="font-semibold">{product.price} ৳</span>
					</p>
				</CardContent>
			</Link>
			<CardFooter>
				{isOutOfStock ? (
					<Button variant="destructive" disabled>
						Out of Stock
					</Button>
				) : isInCart ? (
					<Button variant="default" onClick={handleViewCart}>
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
