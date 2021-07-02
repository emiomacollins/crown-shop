import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutList from '../../COMPONENTS/Checkout/CheckoutList';
import StripePayButton from '../../COMPONENTS/Checkout/StripePayButton';
import { getCartTotal } from '../../REDUX/cartState';

function Checkout() {
	const price = useSelector(getCartTotal);

	return (
		<div className="checkout block">
			<div className="container">
				<CheckoutList />
				<StripePayButton price={price} />
			</div>

			<div className="message">
				<div className="container">
					<p className="bold heading">
						please use the following test card information
					</p>
					<p>
						<span className="bold">card number:</span> 4242 4242 4242 4242
					</p>
					<p>
						<span className="bold">cvc:</span> any 3 digit number
					</p>
					<p>
						<span className="bold">mm/yy :</span> any future date
					</p>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
