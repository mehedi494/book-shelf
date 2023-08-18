import { configureStore } from '@reduxjs/toolkit';
import bookWishlistReducer from '../features/books/bookSlice';
const store = configureStore({
  reducer: {
    wishlist: bookWishlistReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch