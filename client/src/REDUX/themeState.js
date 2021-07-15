import { createSelector, createSlice } from '@reduxjs/toolkit';

// SLICE DEFINITION
const initialState = {
	theme: 'lightmode',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, { payload: theme }) {
			state.theme = theme;
		},
	},
});

// REDUCER
const themeReducer = themeSlice.reducer;
export default themeReducer;

// ACTIONS
export const { setTheme } = themeSlice.actions;

// SELECTORS
const getThemeState = (store) => store.theme;
export const getTheme = createSelector(getThemeState, ({ theme }) => theme);
