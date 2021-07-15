import React from 'react';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import LogoPath from '../../ASSETS/Logo.svg';
import { getCartItemsCount } from '../../REDUX/cartState';

function StripePayButton({ price }) {
	const cartItemsCount = useSelector(getCartItemsCount);

	function handleToken(token) {
		// console.log(token);
	}

	return (
		<StripeCheckout
			stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			// stripe uses cents
			amount={price * 100}
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
