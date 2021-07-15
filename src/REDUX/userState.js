import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchUserData, signIn, signInWithGoogle, signOut, signUp } from './userThunks';

// SLICE DEFINITION
const initialState = {
	user: null,
	userData: null,
	signInErrorMessage: '',
	signUpErrorMessage: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		const thunks = [signInWithGoogle, signIn, signOut, signUp];

		// PENDING
		thunks.forEach((thunk) => {
			builder.addCase(thunk.pending, (state) => {
				state.signInErrorMessage = '';
				state.signUpErrorMessage = '';
			});
		});

		// REJECTED
		thunks.forEach((thunk) => {
			builder.addCase(thunk.rejected, (state, { error }) => {
				console.log(error);
				if (thunk === signUp) {
					state.signUpErrorMessage = error.message;
					return;
				}
				state.signInErrorMessage = error.message;
			});
		});

		// FUFILLED
		[fetchUserData, signInWithGoogle, signUp].forEach((thunk) => {
			builder.addCase(thunk.fulfilled, (state, { payload: { user, userData } }) => {
				state.user = user;
				state.userData = userData;
				state.errorMessage = '';
			});
		});

		// SIGN OUT
		builder.addCase(signOut.fulfilled, (state) => {
			state.user = null;
			state.userData = null;
		});
	},
});

// REDUCER
const userReducer = userSlice.reducer;
export default userReducer;

// ACTIONS
export const { setUser, setUserData } = userSlice.actions;

// SELECTORS
const getUserState = (store) => store.user;
export const getUser = createSelector(getUserState, ({ user }) => user);
export const getUserData = createSelector(getUserState, ({ userData }) => userData);
export const getSignInErrorMessage = createSelector(
	getUserState,
	({ signInErrorMessage }) => signInErrorMessage
);
export const getSignUpErrorMessage = createSelector(
	getUserState,
	({ signUpErrorMessage }) => signUpErrorMessage
);
