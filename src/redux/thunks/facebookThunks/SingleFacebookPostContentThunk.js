import { FacebookFindPostContentApi } from "@/api/facebookFindPostContentApi/facebookFindPostContentApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleFacebookPostThunk = createAsyncThunk(
  "facebookPost/fetchSingle",
  async (postId, { rejectWithValue }) => {
    try {
      console.log(postId);
      const postTemplateId = postId;
      console.log(postTemplateId);
      const response = await FacebookFindPostContentApi(postTemplateId);

      console.log(response, "🥎🥎");
      return response;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);
