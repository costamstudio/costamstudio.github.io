import { createSlice } from '@reduxjs/toolkit';
import { MenuItem } from '../enums/MenuItem';

interface HomeState {
  openedHomeSection: MenuItem | null;
}

const initialState: HomeState = {
  openedHomeSection: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setOpenedHomeSection: (state, action) => {
      state.openedHomeSection = action.payload;
    },
  },
});

export const {
  setOpenedHomeSection,
} = homeSlice.actions;

export default homeSlice.reducer;