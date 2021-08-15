import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Cart from './Cart';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../REDUX/userState';
import { signOut } from '../../REDUX/userThunks';

export default function Nav() {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpanded() {
		setIsExpanded(!isExpanded);
	}

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<div className={`nav ${isExpanded ? 'expanded' : ''}`}>
			<div className="container">
				<Logo />

				<div className="nav__links" onClick={toggleExpanded}>
					<Link to="/shop" className="nav__link">
						SHOP
					</Link>

					<Link to="/contact" className="nav__link">
						CONTACT
					</Link>

					{user ? (
						<Link to="/signin" onClick={handleSignOut} className="nav__link">
							SIGN OUT
						</Link>
					) : (
						<Link to="/signin" className="nav__link">
							SIGN IN
						</Link>
					)}
				</div>

				<div className="nav__controls">
					<Cart />
					<div className="nav__hamburger" onClick={toggleExpanded}>
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
