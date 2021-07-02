import { createSelector, createSlice } from '@reduxjs/toolkit';

// SLICE DEFINITION
const initialState = {
	signedIn: false,
	userData: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setSignedIn(state, { payload: signedIn }) {
			state.signedIn = signedIn;
		},
		setUserData(state, { payload: data }) {
			state.userData = data;
		},
	},
});

// REDUCER
const userReducer = userSlice.reducer;
export default userReducer;

// ACTIONS
export const { setSignedIn, setUserData } = userSlice.actions;

// SELECTORS
const getUserState = (store) => store.user;

export const getSignedIn = createSelector(getUserState, ({ signedIn }) => signedIn);

export const getUserData = createSelector(getUserState, ({ userData }) => userData);
