import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../FIREBASE/firebaseUtil';

const initialState = {
	collections: null,
	loading: 'idle',
	errorMessage: 'Failed to load collections',
};

const fetchCollections = createAsyncThunk(
	'collections/fetchCollections',
	async (thunkAPI) => {
		const collectionsRef = firestore.collection('collections');
		const snapShot = await collectionsRef.get();

		const collections = {};
		snapShot.docs.forEach((doc, i) => {
			const document = doc.data();
			collections[document.title] = { id: document.id, ...document };
		});

		return collections;
	}
);

const collectionsState = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		setCollections(state, { payload: data }) {
			state.collections = data;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCollections.fulfilled, (state, { payload: collections }) => {
			state.collections = collections;
			state.loading = false;
		});
		builder.addCase(fetchCollections.rejected, (state) => {
			// state.collections = null;
			state.loading = false;
		});
		builder.addCase(fetchCollections.pending, (state) => {
			state.loading = true;
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
