export function findItemIndex(cartItems, item) {
	return cartItems.findIndex((cartItem) => cartItem.id === item.id);
}

export function sumUpQuantity(cartItems) {
	return cartItems.reduce((acc, item, i) => {
		return acc + item.quantity;
	}, 0);
}

export function calcTotalPrice(cartItems) {
	return cartItems.reduce((acc, item, i) => {
		return acc + item.price * item.quantity;
	}, 0);
}
