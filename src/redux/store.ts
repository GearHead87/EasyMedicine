import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/productApi';
import { categoriesApi } from './services/categoriesApi';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './features/cart/cartSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	cart: cartReducer,
	// [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		persistedReducer,
		[productApi.reducerPath]: productApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			productApi.middleware,
			categoriesApi.middleware
			// api.middleware
		),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
