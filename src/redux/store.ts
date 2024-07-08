import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/productApi';
import counterReducer from './features/counter/counterSlice';
import { categoriesApi } from './services/categoriesApi';
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		[productApi.reducerPath]: productApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productApi.middleware, categoriesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
