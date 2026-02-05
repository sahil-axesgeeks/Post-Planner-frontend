import { createSlice } from "@reduxjs/toolkit";

const SchedulePostTimeAndDate = createSlice({
  name: "SchedulePostTimeAndDate",
  initialState: {
    time: "12:00:00",
    date: new Date().toISOString().split("T")[0],
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

      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata", // 🔥 changeable
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(dateObj);

      const get = (type) => parts.find((p) => p.type === type)?.value;

      state.date = `${get("year")}-${get("month")}-${get("day")}`;
      state.time = `${get("hour")}:${get("minute")}`;
    },
  },
});

export const { ScheduleDate, ScheduleTime, setSchedule } =
  SchedulePostTimeAndDate.actions;

export default SchedulePostTimeAndDate.reducer;
