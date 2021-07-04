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
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

// REDUX
import { useDispatch } from 'react-redux';
import { setSignedIn, setUserData } from './REDUX/userState';
import { useEffect } from 'react';

function App() {
	// OLD CODE WITH BUG
	// BUG: RERENDERS APP ON AUTH STATE CHANGE
	// CUS IT USES THE AUTHUSER AS A STATE
	// BUG 2: ALSO RERENDERS THE APP ON USERDATA CHANGE
	// FOR THE SAME REASON

	// const [authUser] = useAuthState(auth);
	// const userDocumentQuery = firestore.doc(`users/${authUser?.uid}`);
	// const [userData] = useDocumentData(userDocumentQuery);

	// useEffect(() => {
	// 	if (!authUser) return;
	// 	createUserDocument(authUser);
	// }, [authUser]);

	// useEffect(() => {
	// 	dispatch(setUserData(userData));
	// }, [userData]);

	const dispatch = useDispatch();

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(async (authUser) => {
			const signedIn = authUser ? true : false;
			dispatch(setSignedIn(signedIn));

			// create a document for new users that signup
			signedIn && (await createUserDocument(authUser));

			// fetch the document (even for existing users)
			const userDocumentQuery = firestore.doc(`users/${authUser?.uid}`);
			const userDataSnapshot = await userDocumentQuery.get();
			const userData = userDataSnapshot.data();

			// store the document on redux
			// will be null if authUser is also null
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

// todo
// optimize directory images & host them
