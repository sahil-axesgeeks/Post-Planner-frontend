import { createSlice } from "@reduxjs/toolkit";
import { FacebookLoginThunk } from "@/redux/thunks/facebookThunks/FacebookLoginThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const facebookAuthSlice = createSlice({
  name: "facebookAuth",
  initialState,
  reducers: {
    resetFacebookAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(FacebookLoginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(FacebookLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(FacebookLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Logout
    //   .addCase(facebookLogoutThunk.fulfilled, (state) => {
    //     state.user = null;
    //     state.isAuthenticated = false;
    //   });
  },
});

export const { resetFacebookAuth } = facebookAuthSlice.actions;
export default facebookAuthSlice.reducer;
