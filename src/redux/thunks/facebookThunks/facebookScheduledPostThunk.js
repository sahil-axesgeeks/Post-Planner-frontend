import { FacebookPostApi } from "@/api/facebookPostApi/facebookPostApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const scheduleFacebookPostThunk = createAsyncThunk(
  "auth/scheduleFaceBookPost",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await FacebookPostApi(userData);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
