import { createSlice } from '@reduxjs/toolkit';
import { IBook } from './../../../types/globalTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IWisthlist {
  wishlist: IBook[];
  total: number;
}
const initialState: IWisthlist = {
  wishlist: [],
  total: 0,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addToWisthList: (state, action: PayloadAction<IBook>) => {
      const existing = state.wishlist.find(
        (book) => book._id === action.payload._id
      );
      if (!existing) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.wishlist.push(action.payload);
      }
      state.total = state.wishlist.length;
    },
    
  },
});
export const { addToWisthList } = bookSlice.actions;
export default bookSlice.reducer;
