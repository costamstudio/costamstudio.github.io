import { createSlice } from '@reduxjs/toolkit';
import { CursorType } from '../enums/CursorType';

interface CursorState {
  x: number;
  y: number;
  type: CursorType;
}

const initialState: CursorState = {
  x: 0,
  y: 0,
  type: CursorType.NONE,
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    setPosition: (state, action) => ({
      ...state,
      x: action.payload.x,
      y: action.payload.y,
    }),
    setType: (state, action) => ({
      ...state,
      type: action.payload,
    }),
  },
});

export const {
  setPosition,
  setType,
} = cursorSlice.actions;

export default cursorSlice.reducer;