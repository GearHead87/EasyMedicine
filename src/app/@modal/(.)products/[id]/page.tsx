'use client';
import React, { useEffect, useState } from 'react';
// import ProductDetailsModal from '@/components/ProductDetailsModal';
import ProductDetailsPage from '@/app/products/[id]/page';
import ProductDetailsModal from '@/components/component/ProductDetailsModal';

const ProductInterceptor = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShowModal(true);
		}
	}, []);

	const handleClose = () => {
		setShowModal(false);
		history.back(); // Use the history API to go back
	};

	return (
		<>
			<ProductDetailsPage params={{ id }} />
			{showModal && <ProductDetailsModal productId={id} onClose={handleClose} />}
		</>
	);
};

export default ProductInterceptor;
