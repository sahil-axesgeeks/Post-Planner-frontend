import { createSlice } from "@reduxjs/toolkit";

const OpenNdCloseSlice = createSlice({
  name: "OpenNdClose",
  initialState: {
    isPageOpen: false,
    date: null,
  },
  reducers: {
    openPage: (state) => {
      state.isPageOpen = true;
    },
    closePage: (state) => {
      state.isPageOpen = false;
    },
    togglePage: (state) => {
      state.isPageOpen = !state.isPageOpen;
    },
  },
});

export const { openPage, closePage, togglePage } = OpenNdCloseSlice.actions;
export default OpenNdCloseSlice.reducer;
