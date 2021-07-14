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
		addCartItem(state, { payload }) {
			// check if item exists in cart
			const index = findItemIndex(state.cartItems, payload);

			// if it exists increase quantity
			if (index >= 0) {
				state.cartItems[index].quantity += 1;
				return;
			}

			state.cartItems.push({ ...payload, quantity: 1 });
		},

		removeCartItem(state, { payload }) {
			state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
		},

		DecreaseCartItemQuantity(state, { payload }) {
			const index = findItemIndex(state.cartItems, payload);
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
