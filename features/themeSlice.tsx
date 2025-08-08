import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  isDarkMood: boolean;
};

const initialState: ThemeState = {
  isDarkMood: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMood = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
