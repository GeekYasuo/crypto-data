 
import { configureStore, createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    setData: (state, action) => action.payload,
  },
});

export const { setData } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
