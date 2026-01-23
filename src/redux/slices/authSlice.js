import { createSlice } from "@reduxjs/toolkit";

// THUNK IMPORTS
import { registerUser } from "../thunks/auth/registerAuthThunk";
import { loginAuthThunk } from "../thunks/auth/loginAuthThunk";
import { DecodeCookieThunk } from "../thunks/auth/DecodeCookieThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginAuthThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DECODE-COOKIE

      .addCase(DecodeCookieThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DecodeCookieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(DecodeCookieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
