import { addFirestoreCollection } from './FIREBASE/firebaseUtil';

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

export function migrateCollectionsToFirestore(collectionsList) {
	const filteredCollections = collectionsList.map((collection) => {
		// take only properties you need
		const { title, items, imageUrl } = collection;
		return { title, items, imageUrl };
	});
	addFirestoreCollection('collections', filteredCollections);
}
