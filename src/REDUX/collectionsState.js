import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../FIREBASE/firebaseUtil';

const initialState = {
	collections: null,
	loading: 'idle',
	errorMessage: '',
};

// THUNK
export const fetchCollections = createAsyncThunk(
	'collections/fetchCollections',
	async (thunkAPI) => {
		const collectionsRef = firestore.collection('collections');
		const snapShot = await collectionsRef.get();

		// firebase does not throw an error if there is no internet connection
		// when trying to fetch a collection, it returns an empty snapshot instead
		if (snapShot.empty) throw new Error('Failed to load collections, try again');

		const collections = {};
		snapShot.docs.forEach((document) => {
			const collection = document.data();
			collections[collection.title] = { id: document.id, ...collection };
		});

		return collections;
	}
);

// SLICE
const collectionsState = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		setCollections(state, { payload: data }) {
			state.collections = data;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCollections.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCollections.fulfilled, (state, { payload: collections }) => {
			state.collections = collections;
			state.loading = false;
		});
		builder.addCase(fetchCollections.rejected, (state, { error }) => {
			state.loading = false;
			state.errorMessage = error.message;
		});
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

export const getCollectionsAsList = createSelector(
	getCollectionsState,
	({ collections }) => (collections ? Object.values(collections) : [])
);

export const getCollectionsLoadingState = createSelector(
	getCollectionsState,
	({ loading }) => loading
);

export const getCollectionsErrorMessage = createSelector(
	getCollectionsState,
	({ errorMessage }) => errorMessage
);
