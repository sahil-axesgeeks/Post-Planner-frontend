import { createSlice } from "@reduxjs/toolkit";

const SchedulePostTimeAndDate = createSlice({
  name: "SchedulePostTimeAndDate",
  initialState: {
    time: "12:00:00",
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
    setSchedule(state, action) {
      const dateObj = new Date(action.payload);

      state.date = dateObj.toISOString().slice(0, 10); // 2026-02-02
      state.time = dateObj.toISOString().slice(11, 16); // 11:37
    },
  },
});

export const { ScheduleDate, ScheduleTime, setSchedule } =
  SchedulePostTimeAndDate.actions;

export default SchedulePostTimeAndDate.reducer;
