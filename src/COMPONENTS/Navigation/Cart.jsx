import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	getCartExpanded,
	getCartItems,
	getCartItemsCount,
	toggleCartExpanded,
} from '../../REDUX/cartState';
import { useRef } from 'react';
import { CartIcon } from '../../ASSETS/customSvgs';

function Cart() {
	const dispatch = useDispatch();
	const expanded = useSelector(getCartExpanded);
	const cartItems = useSelector(getCartItems);
	const cartItemsCount = useSelector(getCartItemsCount);

	useEffect(() => {
		cartIconRef.current.style.transform = 'scale(1.2)';
		setTimeout(() => {
			cartIconRef.current.style.transform = 'scale(1)';
		}, 100);
	}, [cartItemsCount]);

	function handleToggleExpanded() {
		dispatch(toggleCartExpanded());
	}

	const cartItemList = cartItems.map((item) => {
		const { id, imageUrl, name, price, quantity } = item;

		return (
			<div key={id} className="cart__item">
				<img src={imageUrl} alt="" className="cart__item__image" />
				<div className="cart__item__detail">
					<p>{name}</p>
					<p>
						{quantity} x ${price}
					</p>
				</div>
			</div>
		);
	});

	const cartIconRef = useRef(null);

	return (
		<div className="cart">
			<span className="cart__count">{cartItemsCount}</span>
			<CartIcon ref={cartIconRef} onClick={handleToggleExpanded} />

			{expanded ? (
				<div className="cart__dropdown">
					<div className="cart__items">
						{cartItems.length ? (
							cartItemList
						) : (
							<p className="cart__message">Your cart is Empty</p>
						)}
					</div>
					<Link onClick={handleToggleExpanded} to="/checkout" className="btn">
						CHECKOUT
					</Link>
				</div>
			) : null}
		</div>
	);
}

export default Cart;
