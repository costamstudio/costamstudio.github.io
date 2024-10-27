import { createSlice } from '@reduxjs/toolkit';
import { Language } from '../enums/Language';
import { MenuItem } from '../enums/MenuItem';

interface CommonState {
  locale: Language;
  openedSection: MenuItem | null;
}

const initialState: CommonState = {
  locale: Language.PL,
  openedSection: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setOpenedSection: (state, action) => ({
      ...state,
      openedSection: action.payload,
    }),
  },
});

export const {
  setLocale,
  setOpenedSection,
} = commonSlice.actions;

export default commonSlice.reducer;