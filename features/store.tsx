import { configureStore } from "@reduxjs/toolkit";
import themneReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    theme: themneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
