import { facebookApi } from "@/api/FacebookLoginApi/facebookLoginApi";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const FacebookLoginThunk = createAsyncThunk(
  "/auth/facebook/Login",
  async (_, { rejectWithValue }) => {
    try {
      console.log("I AM IN THE DECODE-COOKIE-THUNK");

      // CALL THE API
      const data = await facebookApi();
      console.log("FACEBOOK-API-THUNK RESPONSE", data);
      return data; // success payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
