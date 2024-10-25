import { createSlice } from '@reduxjs/toolkit';

interface HeaderState {
  isHeaderVisible: boolean;
  hasHeaderBackground: boolean;
  hasHeaderBigLogo: boolean;
}

const initialState: HeaderState = {
  isHeaderVisible: true,
  hasHeaderBackground: false,
  hasHeaderBigLogo: true,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsHeaderVisible: (state, action) => {
      state.isHeaderVisible = action.payload;
    },
    setHasHeaderBackground: (state, action) => {
      state.hasHeaderBackground = action.payload;
    },
    setHasHeaderBigLogo: (state, action) => {
      state.hasHeaderBigLogo = action.payload;
    },
  },
});

export const {
  setIsHeaderVisible,
  setHasHeaderBackground,
  setHasHeaderBigLogo,
} = headerSlice.actions;

export default headerSlice.reducer;