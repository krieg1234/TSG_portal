import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentPage: 'MainPage',
  },
  reducers: {
    switchPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const { switchPage } = appSlice.actions;
export const selectPage = (state) => state.app.currentPage;
export default appSlice.reducer;
