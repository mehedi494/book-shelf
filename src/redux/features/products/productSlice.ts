
import {  createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Iproduct {
    status: boolean;
    priceRange:number
  
}
const initialState: Iproduct = {
    status: false,
    priceRange:150
}

const productSlice = createSlice({
  name: 'cartSlice',
  initialState,
    reducers: {
        toggleState: (state) => {
            state.status = !state.status;
        },
        setPriceRange: (state,action:PayloadAction<number> ) => {
            state.priceRange = action.payload
        }
   
      
  },
});

export const {toggleState,setPriceRange  } = productSlice.actions;
export default productSlice.reducer;
