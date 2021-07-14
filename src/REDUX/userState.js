import { createSelector, createSlice } from '@reduxjs/toolkit';
import { initializeUser, signInWithGoogle, signOut, signUp } from './userThunks';

// SLICE DEFINITION
const initialState = {
	user: null,
	userData: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		[initializeUser, signInWithGoogle, signOut, signUp].forEach((thunk) => {
			builder.addCase(thunk.rejected, (state, error) => {
				console.log(error);
			});
		});

		// INITIALIZE USER
		builder.addCase(
			initializeUser.fulfilled,
			(state, { payload: { user, userData } }) => {
				state.user = user;
				state.userData = userData;
			}
		);

		// SIGN UP
		builder.addCase(signUp.fulfilled, (state, { payload: { user, userData } }) => {
			state.user = user;
			state.userData = userData;
		});

		// SIGN IN WITH GOOGLE
		builder.addCase(
			signInWithGoogle.fulfilled,
			(state, { payload: { user, userData } }) => {
				state.user = user;
				state.userData = userData;
			}
		);

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
