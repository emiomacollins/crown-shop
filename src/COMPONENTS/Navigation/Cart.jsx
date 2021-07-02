import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	getCartExpanded,
	getCartItems,
	getCartItemsCount,
	toggleExpanded,
} from '../../REDUX/cartState';
import { useRef } from 'react';

function Cart() {
	const expanded = useSelector(getCartExpanded);
	const cartItems = useSelector(getCartItems);
	const cartItemsCount = useSelector(getCartItemsCount);

	const dispatch = useDispatch();

	function handleToggleExpanded() {
		dispatch(toggleExpanded());
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

	useEffect(() => {
		cartIconRef.current.style.transform = 'scale(1.2)';
		setTimeout(() => {
			cartIconRef.current.style.transform = 'scale(1)';
		}, 100);
	}, [cartItemsCount]);

	return (
		<div className="cart">
			<svg
				ref={cartIconRef}
				onClick={handleToggleExpanded}
				className="cart__icon"
				style={{ fill: 'var(--color-dark)' }}
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 407.5 407.5"
			>
				<path
					className="st0"
					d="M263.2,108.4c0,4.5-3.6,8.1-8.1,8.1H143.5c-4.5,0-8.1-3.6-8.1-8.1c0-4.5,3.6-8.1,8.1-8.1h111.6
	C259.6,100.3,263.2,103.9,263.2,108.4z M367.1,100.3h-55.4c-4.5,0-8.1,3.6-8.1,8.1c0,4.5,3.6,8.1,8.1,8.1h47.2v274.7H48.5V116.5
	h44.5c4.5,0,8.1-3.6,8.1-8.1c0-4.5-3.6-8.1-8.1-8.1H40.4c-4.5,0-8.1,3.6-8.1,8.1v290.9c0,4.5,3.6,8.1,8.1,8.1h326.7
	c4.5,0,8.1-3.6,8.1-8.1V108.4C375.2,103.9,371.6,100.3,367.1,100.3z M119.8,134.8c4.5,0,8.1-3.6,8.1-8.1V67.4
	c0-28.2,32.8-51.1,73.4-51.1c40.3,0,73.2,22.9,73.2,51.1v59.3c0,4.5,3.6,8.1,8.1,8.1c4.5,0,8.1-3.6,8.1-8.1V67.4
	c0-37.2-40.1-67.4-89.6-67.4c-49.3,0-89.4,30.2-89.4,67.4v59.3C111.7,131.2,115.3,134.8,119.8,134.8z M119.8,168.5
	c11.5,0,20.9-9.4,20.9-20.9c0-4.5-3.6-8.1-8.1-8.1s-8.1,3.6-8.1,8.1c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7
	c0-4.5-3.6-8.1-8.1-8.1s-8.1,3.6-8.1,8.1C98.9,159.1,108.3,168.5,119.8,168.5z M287.3,147.6c0,2.6-2.1,4.7-4.7,4.7
	c-2.6,0-4.7-2.1-4.7-4.7c0-4.5-3.6-8.1-8.1-8.1s-8.1,3.6-8.1,8.1c0,11.5,9.4,20.9,20.9,20.9c11.5,0,20.9-9.4,20.9-20.9
	c0-4.5-3.6-8.1-8.1-8.1S287.3,143.1,287.3,147.6z"
				/>
			</svg>
			<span className="cart__count">{cartItemsCount}</span>
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
