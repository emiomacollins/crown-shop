import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let config = {
	apiKey: 'AIzaSyDaHLNo1oMhhtI9a1u1zlq2zIWjK8RgYDg',
	authDomain: 'crwn-clothing-270c0.firebaseapp.com',
	projectId: 'crwn-clothing-270c0',
	storageBucket: 'crwn-clothing-270c0.appspot.com',
	messagingSenderId: '851556672162',
	appId: '1:851556672162:web:37926f39b966ddd93d2dfb',
};

!firebase.apps.length && firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export function signInWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	return auth.signInWithPopup(provider);
}

export async function createUserDocument(user, additionalData) {
	// creates a document of the user in firestore if it does not exist (i.e is a new user)

	// get a document reference
	const userRef = firestore.doc(`users/${user.uid}`);

	// check if that reference exists / contains data
	const snapShot = await userRef.get();

	// if data already exists in that reference stop
	if (snapShot.exists) return;

	// if not then create a user with that reference
	const { displayName, email } = user;

	// if authObj does not have a displayName (not signed in with google)
	// & no additional data was passed then dont create an in-complete
	// document just return
	if (!displayName && !additionalData) return;

	// else
	try {
		userRef.set({
			displayName,
			email,
			// createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			createdAt: new Date().getTime(),
			// FOR SETTING DISPLAY NAME ON EMAIL / PASSWORD SIGN UP
			...additionalData,
		});
	} catch (error) {
		console.log(error.message);
	}

	// .set creates the document if it doesnt exist
	// to add to document fields we use .set()
	// to add to a collection we use .add()
}
