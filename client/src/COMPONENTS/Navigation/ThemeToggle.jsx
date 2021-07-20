import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, setTheme } from '../../REDUX/themeState';

function ThemeToggle() {
	const dispatch = useDispatch();
	const theme = useSelector(getTheme);

	document.querySelector(`html`).className = theme;
	let isDarkmode = theme === 'darkmode';

	function handleSetDarkmode() {
		dispatch(setTheme('darkmode'));
	}

	function handleSetLightmode() {
		dispatch(setTheme('lightmode'));
	}

	return (
		<div>
			{isDarkmode ? (
				<i
					onClick={handleSetLightmode}
					className="fas fa-sun nav__theme-switch"
				></i>
			) : (
				<i
					onClick={handleSetDarkmode}
					className="fas fa-moon nav__theme-switch"
				></i>
			)}
		</div>
	);
}

export default ThemeToggle;
