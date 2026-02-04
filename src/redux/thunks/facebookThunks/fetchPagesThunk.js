import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPagesApi } from "@/api/fetchPagesApi/fetchPagesApi";

export const FetchPagesThunk = createAsyncThunk(
  "/auth/facebookPagesList",
  async (_, { rejectWithValue }) => {
    try {
      console.log("I AM INSIDE THE FETCH-PAGE-THUNK , 😎😎😴😴😴😴");
      const data = await fetchPagesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
