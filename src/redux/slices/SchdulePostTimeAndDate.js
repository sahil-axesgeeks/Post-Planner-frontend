import { createSlice } from "@reduxjs/toolkit";

const SchedulePostTimeAndDate = createSlice({
  name: "SchedulePostTimeAndDate",
  initialState: {
    time: "12:00:AM",
    date: null,
  },
  reducers: {
    ScheduleTime: (state, action) => {
      console.log(action, "🙌🙌");
      state.time = action.payload;
    },

    ScheduleDate: (state, action) => {
      console.log(action, "🙌🙌");
      state.date = action.payload;
    },
  },
});

export const { ScheduleDate, ScheduleTime } = SchedulePostTimeAndDate.actions;

export default SchedulePostTimeAndDate.reducer;
