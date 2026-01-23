import { DecodeUserDetail } from "@/api/user/DecodeUserDetail/DecodeUserDetail";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const DecodeCookieThunk = createAsyncThunk(
  "api/v1/userDetails",
  async (_, { rejectWithValue }) => {
    try {
      console.log("I AM IN THE DECODE-COOKIE-THUNK");

      // CALL THE API
      const data = await DecodeUserDetail();
      console.log("DECODE-COOKIE-THUNK RESPONSE", data);
      return data; // success payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
