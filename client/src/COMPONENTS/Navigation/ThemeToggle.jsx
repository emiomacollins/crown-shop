import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, setTheme } from '../../REDUX/themeState';

function ThemeToggle() {
	const dispatch = useDispatch();
	const theme = useSelector(getTheme);

	useEffect(() => {
		document.querySelector(`html`).className = theme;
	}, [theme]);

	function handleSetTheme() {
		dispatch(setTheme(theme === 'lightmode' ? 'darkmode' : 'lightmode'));
	}

	return (
		<div>
			<i
				onClick={handleSetTheme}
				className={`fas fa-${
					theme === 'darkmode' ? 'sun' : 'moon'
				} nav__theme-switch`}
			></i>
		</div>
	);
}

export default ThemeToggle;
