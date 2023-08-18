import { configureStore } from '@reduxjs/toolkit';
import bookWishlistReducer from '../features/books/bookSlice';
import { api } from '../api/apiSlice';
const store = configureStore({
  reducer: {
    wishlist: bookWishlistReducer,

    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch