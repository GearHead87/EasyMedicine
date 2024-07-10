import { createSlice } from '@reduxjs/toolkit';

export interface CartItem {
	id: string;
	name: string;
	price: number;
	stock: number;
	image: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existingItem = state.items.find((item) => item.id === action.payload.id);
			if (existingItem) {
				existingItem.quantity += item.quantity | 1;
			} else {
				state.items.push({ ...action.payload, quantity: item.quantity || 1 });
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
		},
		increaseQuantity: (state, action) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item && item.quantity < action.payload.stock) {
				item.quantity += 1;
			}
		},
		decreaseQuantity: (state, action) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},
		emptyCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } =
	cartSlice.actions;
export default cartSlice.reducer;
