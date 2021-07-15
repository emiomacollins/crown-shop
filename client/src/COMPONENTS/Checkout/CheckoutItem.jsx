import React from 'react';
import { useDispatch } from 'react-redux';
import {
	addCartItem,
	DecreaseCartItemQuantity,
	removeCartItem,
} from '../../REDUX/cartState';

function CheckoutItem({ item }) {
	const { imageUrl, name, quantity, price } = item;
	const dispatch = useDispatch();

	function handleIncreaseQuantity() {
		dispatch(addCartItem(item));
	}

	function handleDecreaseQuantity() {
		dispatch(DecreaseCartItemQuantity(item));
	}

	function handleRemoveItem() {
		dispatch(removeCartItem(item));
	}

	return (
		<div className="checkout__item">
			<img src={imageUrl} alt="" className="checkout__image" />
			<div className="checkout__details">
				<p className="checkout__description">{name}</p>

				<div className="checkout__quantity">
					<i
						onClick={handleDecreaseQuantity}
						className="fas fa-minus-square icon btn btn--text"
					></i>
					<p>{quantity}</p>
					<i
						onClick={handleIncreaseQuantity}
						className="fas fa-plus-square icon btn btn--text"
					></i>
				</div>

				<p className="checkout__price">${price}</p>

				<button
					onClick={handleRemoveItem}
					className="checkout__remove btn btn--text"
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default CheckoutItem;
