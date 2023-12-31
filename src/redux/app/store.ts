import { configureStore } from '@reduxjs/toolkit';
import bookWishlistReducer from '../features/books/bookSlice';
import authReducer from '../features/auth/authSlice'
import { api } from '../api/apiSlice';
const store = configureStore({
  reducer: {
    books: bookWishlistReducer,
    auth:authReducer,

    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
