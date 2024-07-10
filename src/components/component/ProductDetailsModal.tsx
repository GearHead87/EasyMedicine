import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProductDetails from './ProductDetails';

const ProductDetailsModal = ({ productId, onClose }) => {
	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className='max-w-xl'>
				<ProductDetails productId={productId} />
				<Button onClick={onClose}>Close</Button>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDetailsModal;
