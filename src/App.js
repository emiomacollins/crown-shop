/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import './CSS/App.scss';
import 'normalize-css';

// COMPONENTS
import Nav from './COMPONENTS/Navigation/Nav';
import Homepage from './PAGES/Homepage/Homepage';
import ShopPage from './PAGES/Shoppage/ShopPage';
import AuthenticationPage from './PAGES/Authpage/AuthenticationPage';
import Checkout from './PAGES/Checkout/Checkout';
import { useEffect } from 'react';
import { auth } from './FIREBASE/firebaseUtil';
import { useDispatch } from 'react-redux';
import { fetchUserData } from './REDUX/userThunks';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		// firebsae initializes the authUser
		// so reflect it in your store when the app mounts
		return auth.onAuthStateChanged((authUser) => {
			authUser && dispatch(fetchUserData(authUser));
		});
	}, []);

	return (
		<>
			<Nav />
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/signin" component={AuthenticationPage} />
				<Route exact path="/checkout" component={Checkout} />
			</Switch>
		</>
	);
}

export default App;

// TODO
// optimize directory images & host them on a CDN
