import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import LogoPath from '../../ASSETS/Logo.svg';

function StripePayButton({ price }) {
	// stripe uses cents
	const priceInCents = price * 100;
	const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

	function handleToken(token) {
		console.log(token);
	}

	return (
		<StripeCheckout
			stripeKey={publishableKey}
			amount={priceInCents}
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
