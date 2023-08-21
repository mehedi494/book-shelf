/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBook } from './../../../types/globalTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IWisthlist {
  wishlist: IBook[];
  total: number;
  loading: boolean;
  books: [];
  error: boolean;
  errorMessage: string;
  isSuccess: boolean;
}
export interface IFilter {
  genre: string;
  publication_date: string;
}
export interface ISearch {
  searchTerm: string;
}
export const filterBook = createAsyncThunk(
  'book/filterdata',
  async (payload: IFilter) => {
    console.log(payload);
    if (!payload.genre && !payload.publication_date) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks?`
      );
      const data = response.json();
      return data;
    } else if (payload.genre && !payload.publication_date) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks?genre=${
          payload.genre
        }`
      );
      const data = response.json();
      return data;
    } else if (!payload.genre && payload.publication_date) {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/book/allbooks?publication_date=${payload.publication_date}`
      );
      const data = response.json();
      return data;
    } else if (payload.genre && payload.publication_date) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks?genre=${
          payload.genre
        }&&publication_date=${payload.publication_date}`
      );
      const data = response.json();
      return data;
    }
  }
);
export const searchBook = createAsyncThunk(
  'book/filterdata',
  async (payload: ISearch) => {
    if (!payload.searchTerm) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks?`
      );
      const data = response.json();
      return data;
    }
    if (payload.searchTerm) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks?searchTerm=${
          payload?.searchTerm
        }`
      );
      const data = response.json();
      return data;
    }
  }
);
export const getAllBooks = createAsyncThunk('book/getAllBooks', async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/book/allbooks`
  );
  const data = response.json();
  // console.log(data);
  return data;
});

const initialState: IWisthlist = {
  wishlist: [],
  total: 0,
  loading: false,
  books: [],
  error: false,
  errorMessage: '',
  isSuccess: false,
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
    setBooks: (state, action: PayloadAction) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      state.books.push(action?.payload!);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(filterBook.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(filterBook.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message!;
      })
      .addCase(filterBook.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorMessage = '';
        state.isSuccess = true;
        state.books = action.payload?.data?.data;
      });
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.isSuccess = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorMessage = '';
        state.isSuccess = true;
        state.books = action.payload.data?.data;
      });
  },
});
export const { addToWisthList, setBooks } = bookSlice.actions;
export default bookSlice.reducer;
