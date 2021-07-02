import React from 'react';
import { Link } from 'react-router-dom';
import Logopath from '../../ASSETS/Logo.svg';
import LightLogoPath from '../../ASSETS/LightLogo.svg';
import { useSelector } from 'react-redux';
import { getTheme } from '../../REDUX/themeState';

function Logo() {
	const theme = useSelector(getTheme);
	const isDarkmode = theme === 'darkmode';

	return (
		<Link to="/" className="nav__logo">
			<img src={isDarkmode ? LightLogoPath : Logopath} alt="" />
		</Link>
	);
}

export default Logo;
