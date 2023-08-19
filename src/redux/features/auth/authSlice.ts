import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
 
    _id: string |undefined;
    name: string |undefined;
    email: string |undefined;
    role: string |undefined;
    createdAt: string |undefined;
    updatedAt: string |undefined;
    id: string |undefined;

}
interface IAuthStat{
  user:IUser 
}
const initialState:IAuthStat = {
  user: {
    _id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    id: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser >) => {
      state.user = action.payload ;
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
