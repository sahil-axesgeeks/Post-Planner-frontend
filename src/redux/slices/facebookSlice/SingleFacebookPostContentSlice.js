import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleFacebookPostThunk } from "@/redux/thunks/facebookThunks/SingleFacebookPostContentThunk";

export const FacebookPostContentSlice = createSlice({
  name: "singleFacebookPostContent",
  initialState: {
    singleFacebookPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSinglePost: (state) => {
      state.singleFacebookPost = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSingleFacebookPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSingleFacebookPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleFacebookPost = action.payload?.scheduledPost;
      })

      .addCase(fetchSingleFacebookPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSinglePost } = FacebookPostContentSlice.actions;
export default FacebookPostContentSlice.reducer;
