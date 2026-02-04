import { createSlice } from "@reduxjs/toolkit";

const OpenNdCloseSlice = createSlice({
  name: "OpenNdClose",
  initialState: {
    isPageOpen: false,
    isPageOpenEdit: false,
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
      console.log(state.isPageOpen);
      state.isPageOpen = !state.isPageOpen;
    },
    togglePageEdit: (state) => {
      console.log(state.isPageOpenEdit);
      state.isPageOpenEdit = !state.isPageOpenEdit;
    },
  },
});

export const { openPage, closePage, togglePage, togglePageEdit } =
  OpenNdCloseSlice.actions;
export default OpenNdCloseSlice.reducer;
