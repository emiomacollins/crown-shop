import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	getCartExpanded,
	getCartItemsCount,
	toggleCartExpanded,
} from '../../REDUX/cartState';
import CartItemsList from './CartItemsList';

import { CartIcon } from '../../ASSETS/customSvgs';
import styled from 'styled-components';

function Cart() {
	const dispatch = useDispatch();
	const expanded = useSelector(getCartExpanded);
	const cartItemsCount = useSelector(getCartItemsCount);
	const cartIconRef = useRef(null);

	useEffect(() => {
		cartIconRef.current.style.transform = 'scale(1.2)';
		setTimeout(() => {
			cartIconRef.current.style.transform = 'scale(1)';
		}, 100);
	}, [cartItemsCount]);

	function handleToggleExpanded() {
		dispatch(toggleCartExpanded());
	}

	return (
		<Container>
			<Count>{cartItemsCount}</Count>
			<Icon ref={cartIconRef} onClick={handleToggleExpanded} />
			{expanded && (
				<Dropdown>
					<CartItemsList />
					<Link onClick={handleToggleExpanded} to="/checkout" className="btn">
						CHECKOUT
					</Link>
				</Dropdown>
			)}
		</Container>
	);
}

export default Cart;

// STYLES
const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Icon = styled(CartIcon)`
	width: 3rem;
	height: 3rem;
	cursor: pointer;
`;

const Count = styled.span`
	position: absolute;
	font-weight: bold;
	top: 50%;
	transform: translateY(-30%);
	pointer-events: none;
`;

const Dropdown = styled.div`
	position: absolute;
	width: 26rem;
	height: 35rem;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	background-color: var(--color-light);
	top: 180%;
	right: -5rem;
	box-shadow: var(--box-shadow);

	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 5rem;
	}
`;
