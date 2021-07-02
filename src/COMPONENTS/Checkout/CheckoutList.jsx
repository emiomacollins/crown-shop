import React from 'react';
import { useSelector } from 'react-redux';
import { getCartItems, getCartTotal } from '../../REDUX/cartState';
import CheckoutItem from './CheckoutItem';

function CheckoutList() {
	const items = useSelector(getCartItems);
	const total = useSelector(getCartTotal);

	return (
		<div className="checkout__list">
			{items.map((item) => {
				return <CheckoutItem key={item.id} item={item} />;
			})}
			<p className="checkout__total">Total: ${total}</p>
		</div>
	);
}

export default CheckoutList;
