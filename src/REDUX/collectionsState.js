import { createSelector, createSlice } from '@reduxjs/toolkit';
import SHOP_DATA from '../PAGES/Shoppage/data';

const initialState = {
	collections: SHOP_DATA,
};

const collectionsState = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		setCollections(state, { payload: data }) {
			state.collections = data;
		},
	},
});

// REDUCER
const collectionsReducer = collectionsState.reducer;
export default collectionsReducer;

// ACTIONS
export const { setCollections } = collectionsState.actions;

// SELECTORS
const getCollectionsState = (store) => store.collections;

export const getCollections = createSelector(
	getCollectionsState,
	({ collections }) => collections
);

export const getCollectionsList = createSelector(getCollectionsState, ({ collections }) =>
	Object.values(collections)
);
