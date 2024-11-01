import { configureStore } from "@reduxjs/toolkit";

import assetsReducer from "./assets";
import headerReducer from "./header";
import commonReducer from "./common";
import homeReducer from "./home";
import cursorReducer from "./cursor";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    header: headerReducer,
    common: commonReducer,
    home: homeReducer,
    cursor: cursorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;