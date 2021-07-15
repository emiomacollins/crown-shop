import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	auth,
	createUserDocument,
	firestore,
	googleProvider,
} from '../FIREBASE/firebaseUtil';
import { clearCartItems } from './cartState';

// fires when authState changes i.e when you sign in / sign up
// when you sign up the document has not been created so it breaks
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (user) => {
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapShot = await userRef.get();

	// skip fetching userData if user doesn't exist
	if (!snapShot.exists) throw new Error();

	const userData = snapShot.data();
	return { user, userData };
});

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		throw new Error(error.message);
	}
});

export const signUp = createAsyncThunk(
	'user/signUp',
	async ({ email, password, displayName }) => {
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			const userData = await createUserDocument(user, { displayName });
			return { user, userData };
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

export const signInWithGoogle = createAsyncThunk('user/signInWithGoogle', async () => {
	const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);

	// dont create user document if user already exists
	if (!additionalUserInfo.isNewUser) throw new Error();

	const userData = await createUserDocument(user);
	return { user, userData };
});

export const signOut = createAsyncThunk('user/signOut', async (params, { dispatch }) => {
	await auth.signOut();
	dispatch(clearCartItems());
});
