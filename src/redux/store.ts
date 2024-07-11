import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/productApi';
import { categoriesApi } from './services/categoriesApi';
import { userApi } from './services/userApi';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './features/cart/cartSlice';
import cartDropdownReducer from './features/cartDropdown/cartDropdownSlice'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart']
};

const rootReducer = combineReducers({
	cart: cartReducer,
	cartDropdown: cartDropdownReducer,
	[productApi.reducerPath]: productApi.reducer,
	[categoriesApi.reducerPath]: categoriesApi.reducer,
	[userApi.reducerPath]: userApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			productApi.middleware,
			categoriesApi.middleware,
			userApi.middleware
		),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
