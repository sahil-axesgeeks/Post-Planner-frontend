import { createSlice } from "@reduxjs/toolkit";
import { FetchPagesThunk } from "../thunks/facebookThunks/fetchPagesThunk";

const fetchPageSlice = createSlice({
  name: "FetchPage",
  initialState: {
    pages: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchPagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchPagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(FetchPagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch pages";
      });
  },
});

export default fetchPageSlice.reducer;
