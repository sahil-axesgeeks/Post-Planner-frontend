import { createSlice } from "@reduxjs/toolkit";

// THUNKS
import { registerUser } from "../thunks/auth/registerAuthThunk";
import { loginAuthThunk } from "../thunks/auth/loginAuthThunk";
import { DecodeCookieThunk } from "../thunks/auth/DecodeCookieThunk";

const initialState = {
  user: null,
  loading: false,
  initialized: false, // 🔑 auth checked at least once
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
    logout: (state) => {
      state.user = null;
      state.initialized = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user; // ✅ FIX
        state.initialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.initialized = true;
      })

      .addCase(loginAuthThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user; // ✅ FIX
        state.initialized = true;
      })
      .addCase(loginAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.initialized = true;
      })

      .addCase(DecodeCookieThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DecodeCookieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
        state.initialized = true;
      })
      .addCase(DecodeCookieThunk.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
      });
  },
});

export const { resetAuthState, logout, setUser, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;
