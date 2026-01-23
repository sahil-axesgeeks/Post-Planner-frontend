import { createSlice } from "@reduxjs/toolkit";

const ScheduledPostSlice = createSlice({
  name: "SchedulePost",
  initialState: {
    schedulePosts: [],
  },
  reducers: {
    addToSchdeuledPosts: (state, action) => {
      console.log(action.payload, "😍😍");
      state.schedulePosts.push(action.payload);
    },
  },
});

export const { addToSchdeuledPosts } = ScheduledPostSlice.actions;

export default ScheduledPostSlice.reducer;
