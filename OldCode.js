// APP.JS (OLD AUTHENTICATION LOGIC)
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
