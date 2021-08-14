import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCartItems } from '../../REDUX/cartState';

function CartItemsList() {
	const cartItems = useSelector(getCartItems);

	return (
		<Container>
			{cartItems.length ? (
				cartItems.map((item) => {
					const { id, imageUrl, name, price, quantity } = item;
					return (
						<Item key={id}>
							<Image src={imageUrl} />
							<Details>
								<p>{name}</p>
								<p>
									{quantity} x ${price}
								</p>
							</Details>
						</Item>
					);
				})
			) : (
				<Message>Your cart is Empty</Message>
			)}
		</Container>
	);
}

export default CartItemsList;

// STYLES
const Message = styled.p`
	text-align: center;
	margin: auto 0;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: scroll;
	flex-grow: 1;
	gap: 2rem;
	overflow-x: hidden;
	padding-bottom: 2rem;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	cursor: default;
`;

const Image = styled.img`
	width: 6rem;
	height: 6rem;
	object-fit: cover;
`;

const Details = styled.div`
	font-size: var(--size-300);
`;
