import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import LogoPath from '../../ASSETS/Logo.svg';
import { clearCartItems, getCartItemsCount } from '../../REDUX/cartState';
import axios from 'axios';

function StripePayButton({ price }) {
	const cartItemsCount = useSelector(getCartItemsCount);
	const dispatch = useDispatch();

	// stripe uses cents
	const stripePrice = price * 100;

	async function handleToken(token) {
		try {
			const res = await axios({
				url: '/payment',
				method: 'post',
				data: {
					token,
					amount: stripePrice,
				},
			});

			console.log(res);

			dispatch(clearCartItems());
			alert(`Payment successful.`);
		} catch (error) {
			alert('payment error');
		}
	}

	return (
		<StripeCheckout
			stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			amount={stripePrice}
			currency="USD"
			name="crown shop"
			description={`your total is $${price}`}
			shippingAddress
			billingAddress
			image={LogoPath}
			token={handleToken}
		>
			<button disabled={!cartItemsCount} className="btn">
				PAY NOW
			</button>
		</StripeCheckout>
	);
}

export default StripePayButton;
