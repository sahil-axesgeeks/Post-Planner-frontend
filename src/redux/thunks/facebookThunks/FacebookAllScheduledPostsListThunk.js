import { facebookFetchScheduledPostsApi } from "@/api/facebookFetchScheduledPosts/facebookFetchScheduledPostsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const FacebookAllScheduledPostsThunk = createAsyncThunk(
  "auth/allscheduledposts",
  async (startEndDate, { rejectWithValue }) => {
    console.log(startEndDate);
    try {
      console.log("the thunk");
      //    MAKE THE FETCH-SCHEDULE-POST-API
      const data = await facebookFetchScheduledPostsApi(startEndDate);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
