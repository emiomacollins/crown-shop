import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { sumUpQuantity, findItemIndex, calcTotalPrice } from '../Helper';

// SLICE DEFINITION
const initialState = {
	cartItems: [],
	expanded: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartItem(state, { payload: item }) {
			// check if item exists in cart
			const index = findItemIndex(state.cartItems, item);

			// if it exists increase quantity
			if (index >= 0) {
				state.cartItems[index].quantity += 1;
				return;
			}

			state.cartItems.push({ ...item, quantity: 1 });
		},

		removeCartItem(state, { payload: item }) {
			state.cartItems = state.cartItems.filter(
				(existingItem) => existingItem.id !== item.id
			);
		},

		DecreaseCartItemQuantity(state, { payload: item }) {
			const index = findItemIndex(state.cartItems, item);

			if (index >= 0) {
				state.cartItems[index].quantity =
					state.cartItems[index].quantity - 1 || 1;
			}
		},

		toggleCartExpanded(state) {
			state.expanded = !state.expanded;
		},

		clearCartItems(state) {
			state.cartItems = [];
		},
	},
});

// REDUCER
const cartReducer = cartSlice.reducer;
export default cartReducer;

// ACTION CREATORS
export const {
	addCartItem,
	removeCartItem,
	DecreaseCartItemQuantity,
	toggleCartExpanded,
	clearCartItems,
} = cartSlice.actions;

// SELECTORS
const getCartState = (store) => store.cart;

export const getCartItems = createSelector(getCartState, (store) => store.cartItems);

export const getCartItemsCount = createSelector(getCartItems, (cartItems) =>
	sumUpQuantity(cartItems)
);

export const getCartTotal = createSelector(getCartItems, (cartItems) =>
	calcTotalPrice(cartItems)
);

export const getCartExpanded = createSelector(getCartState, (cart) => cart.expanded);
