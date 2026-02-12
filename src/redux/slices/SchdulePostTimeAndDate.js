import { createSlice } from "@reduxjs/toolkit";

// ✅ Get current IST date & time safely
const now = new Date();

const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");

const hh = String(now.getHours()).padStart(2, "0");
const min = String(now.getMinutes()).padStart(2, "0");
const ss = String(now.getSeconds()).padStart(2, "0");

const SchedulePostTimeAndDate = createSlice({
  name: "SchedulePostTimeAndDate",
  initialState: {
    date: `${yyyy}-${mm}-${dd}`, // ✅ YYYY-MM-DD
    time: `${hh}:${min}:${ss}` || "00:00:00", // ✅ HH:MM:SS
  },
  reducers: {
    ScheduleTime: (state, action) => {
      console.log(action.payload, "🥽🥽🥽");
      state.time = action.payload;
    },

    ScheduleDate: (state, action) => {
      console.log(action.payload, "🧶🧶🧶");
      state.date = action.payload;
    },

    // ✅ When backend sends full ISO datetime
    setSchedule: (state, action) => {
      const dateObj = new Date(action.payload);

      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(dateObj);
      const get = (type) => parts.find((p) => p.type === type)?.value;

      state.date = `${get("year")}-${get("month")}-${get("day")}`;
      state.time = `${get("hour")}:${get("minute")}:${get("second")}`;
      // console.log(date , time)
    },
  },
});

export const { ScheduleDate, ScheduleTime, setSchedule } =
  SchedulePostTimeAndDate.actions;

export default SchedulePostTimeAndDate.reducer;
