// redux/features/cartDropdown/cartDropdownSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const cartDropdownSlice = createSlice({
	name: 'cartDropdown',
	initialState: {
		isOpen: false,
	},
	reducers: {
		openCartDropdown: (state) => {
			state.isOpen = true;
		},
		closeCartDropdown: (state) => {
			state.isOpen = false;
		},
		toggleCartDropdown: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { openCartDropdown, closeCartDropdown, toggleCartDropdown } =
	cartDropdownSlice.actions;

export default cartDropdownSlice.reducer;
