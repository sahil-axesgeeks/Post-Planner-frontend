import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAuthApi } from "@/api/user/loginUserApi";

export const loginAuthThunk = createAsyncThunk(
  "api/v1/UserLogin",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("I AM IN THE LOGIN-AUTH-THUNK", userData);

      // CALL THE API
      const data = await loginAuthApi(userData);
      console.log("THUNK RESPONSE", data);
      return data; // success payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
