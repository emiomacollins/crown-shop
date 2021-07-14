import { createSelector, createSlice } from '@reduxjs/toolkit';

// SLICE DEFINITION
const initialState = {
	user: false,
	userData: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload: user }) {
			state.user = user;
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
export const { setUser, setUserData } = userSlice.actions;

// SELECTORS
const getUserState = (store) => store.user;

export const getUser = createSelector(getUserState, ({ user }) => user);
export const getUserData = createSelector(getUserState, ({ userData }) => userData);
