import { createSlice } from '@reduxjs/toolkit';
import { MenuItem } from '../enums/MenuItem';

interface HomeState {
  isRightContainerOpened: boolean;
  isBottomContainerOpened: boolean;
}

const initialState: HomeState = {
  isRightContainerOpened: false,
  isBottomContainerOpened: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsRightContainerOpened: (state, action) => ({
      ...state,
      isRightContainerOpened: action.payload,
    }),
    setIsBottomContainerOpened: (state, action) => ({
      ...state,
      isBottomContainerOpened: action.payload,
    }),
  },
});

export const {
  setIsRightContainerOpened,
  setIsBottomContainerOpened,
} = homeSlice.actions;

export default homeSlice.reducer;