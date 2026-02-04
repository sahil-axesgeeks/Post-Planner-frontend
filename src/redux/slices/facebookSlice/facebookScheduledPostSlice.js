import { createSlice } from "@reduxjs/toolkit";
import { scheduleFacebookPostThunk } from "@/redux/thunks/facebookThunks/facebookScheduledPostThunk";

// THE CREATED SCHEDULED POST WAS SAVED OVER HERE
const facebookScheduleSlice = createSlice({
  name: "facebookSchedule",
  initialState: {
    loading: false,
    success: false,
    error: null,
    scheduledPosts: [],
  },

  reducers: {
    resetScheduleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleFacebookPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleFacebookPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.scheduledPosts.push(action.payload.SchedulePostData);
      })
      .addCase(scheduleFacebookPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetScheduleState } = facebookScheduleSlice.actions;
export default facebookScheduleSlice.reducer;
