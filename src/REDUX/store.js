import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartState';
import themeReducer from './themeState';
import userReducer from './userState';
import persistReducer from 'redux-persist/es/persistReducer';
import collectionsReducer from './collectionsState';

import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart', 'theme'],
};

const store = configureStore({
	reducer: persistReducer(
		persistConfig,
		combineReducers({
			user: userReducer,
			cart: cartReducer,
			theme: themeReducer,
			collections: collectionsReducer,
		})
	),
});

export default store;

export const persistor = persistStore(store);
