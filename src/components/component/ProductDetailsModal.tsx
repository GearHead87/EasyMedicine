import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent
} from '@/components/ui/dialog';
import ProductDetails from './ProductDetails';

const ProductDetailsModal = ({ productId, onClose }: { productId: string; onClose: Function }) => {
	return (
		<Dialog open={true} onOpenChange={() => onClose()}>
			<DialogContent className="max-w-2xl">
				<ProductDetails productId={productId} />
				<Button onClick={() => onClose()}>Close</Button>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDetailsModal;
