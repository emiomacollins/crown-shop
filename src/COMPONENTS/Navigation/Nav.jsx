import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../FIREBASE/firebaseUtil';

import Cart from './Cart';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import { getSignedIn } from '../../REDUX/userState';

export default function Nav() {
	const signedIn = useSelector(getSignedIn);
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpanded() {
		setIsExpanded(!isExpanded);
	}

	function handleSignOut() {
		toggleExpanded();
		auth.signOut();
	}

	return (
		<div className={`nav ${isExpanded ? 'expanded' : ''}`}>
			<div className="container">
				<Logo />

				<div className="nav__links">
					<Link onClick={toggleExpanded} to="/shop" className="nav__link">
						SHOP
					</Link>

					<Link onClick={toggleExpanded} to="/contact" className="nav__link">
						CONTACT
					</Link>

					{signedIn ? (
						<Link to="/signin" onClick={handleSignOut} className="nav__link">
							SIGN OUT
						</Link>
					) : (
						<Link onClick={toggleExpanded} to="/signin" className="nav__link">
							SIGN IN
						</Link>
					)}
				</div>

				<div className="nav__controls">
					<Cart />
					<div onClick={toggleExpanded} className="nav__hamburger">
						<span className="line" />
						<span className="line" />
						<span className="line" />
					</div>
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}
