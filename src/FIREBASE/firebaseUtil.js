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
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapShot = await userRef.get();

	if (snapShot.exists) return;
	const { displayName, email } = user;

	userRef.set({
		displayName,
		email,
		createdAt: new Date().getTime(),
		...additionalData,
	});
}

export async function addFirestoreCollection(name, list) {
	const collectionRef = firestore.collection(name);
	const batch = firestore.batch();

	// create a document for each collection
	list.forEach((document) => {
		// create new document
		const newDocumentRef = collectionRef.doc();
		// add to batch
		batch.set(newDocumentRef, document);
	});

	return await batch.commit();
}
