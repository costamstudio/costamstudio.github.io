import { createSlice } from '@reduxjs/toolkit';
import { Language } from '../enums/Language';

interface CommonState {
  locale: Language;
}

const initialState: CommonState = {
  locale: Language.PL,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const {
  setLocale,
} = commonSlice.actions;

export default commonSlice.reducer;