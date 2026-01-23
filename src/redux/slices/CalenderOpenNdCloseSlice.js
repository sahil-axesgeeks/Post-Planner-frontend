import { createSlice } from "@reduxjs/toolkit";

export const CalenderOpenNdCloseSlice = createSlice({
  name: "CalenderOpenNdClose",
  initialState: {
    isCalenderOpen: false,
  },
  reducers: {
    CalenderOpen: (state) => {
      state.isCalenderOpen = true;
    },

    CalenderClose: (state) => {
      state.isCalenderOpen = false;
    },

    ToggleCalender: (state) => {
      state.isCalenderOpen = !state.isCalenderOpen;
    },
  },
});

export const { CalenderClose, CalenderOpen, ToggleCalender } =
  CalenderOpenNdCloseSlice.actions;
export default CalenderOpenNdCloseSlice.reducer;
