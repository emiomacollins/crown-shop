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

// FIREBASE
import { auth, createUserDocument, firestore } from './FIREBASE/firebaseUtil';

// REDUX
import { useDispatch } from 'react-redux';
import { setSignedIn, setUserData } from './REDUX/userState';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(async (authUser) => {
			const signedIn = authUser ? true : false;
			dispatch(setSignedIn(signedIn));

			// create a document (does not create if user exists)
			// (existing users have documents already)
			signedIn && (await createUserDocument(authUser));

			// fetch the document
			const userRef = firestore.doc(`users/${authUser?.uid}`);
			const snapShot = await userRef.get();
			const userData = snapShot.exists ? snapShot.data() : null;

			// store the document on redux
			dispatch(setUserData(userData));
		});
		return unsuscribe;
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
// optimize directory images & host them
