import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi } from "../../../api/user/registerUserApi";

export const registerUser = createAsyncThunk(
  "api/v1/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      console.log("THUNK RESPONSE", data);
      return data; // success payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
