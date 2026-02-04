// redux/slices/FacebookAllScheduledPostsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { FacebookAllScheduledPostsThunk } from "@/redux/thunks/facebookThunks/FacebookAllScheduledPostsListThunk";

const FacebookAllScheduledPostsSlice = createSlice({
  name: "facebookAllScheduledPosts",
  initialState: {
    allScheduledPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAllScheduledPosts: (state) => {
      state.allScheduledPosts = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⏳ Pending
      .addCase(FacebookAllScheduledPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(FacebookAllScheduledPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allScheduledPosts = action.payload;
      })

      // ❌ Error
      .addCase(FacebookAllScheduledPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllScheduledPosts } =
  FacebookAllScheduledPostsSlice.actions;

export default FacebookAllScheduledPostsSlice.reducer;
