import ProductDetails from '@/components/component/ProductDetails';
import React from 'react';

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return (
		<div>
			<ProductDetails productId={id} />
		</div>
	);
};

export default ProductDetailsPage;
