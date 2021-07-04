import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import LogoPath from '../../ASSETS/Logo.svg';

function StripePayButton({ price }) {
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
			<button className="btn">PAY NOW</button>
		</StripeCheckout>
	);
}

export default StripePayButton;
