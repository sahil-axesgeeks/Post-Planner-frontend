import { createSlice } from "@reduxjs/toolkit";

const ScheduledPostSlice = createSlice({
  name: "SchedulePost",
  initialState: {
    draft: {
      postType: "",
      postContent: "",
      scheduledAt: null,
    },
    //ALL THE POSTS WHICH ARE SCHEULED MEANS LINE-UP IN THE EXCHANGE
    scheduledPosts: [],
  },
  reducers: {
    setPostType(state, action) {
      console.log("Setting the  post type ");
      state.draft.postType = action.payload;
    },
    setPostContent(state, action) {
      state.draft.postContent = action.payload;
    },
    setScheduledAt(state, action) {
      state.draft.scheduledAt = action.payload;
    },
    addToScheduledPosts(state) {
      state.scheduledPosts.push({
        ...state.draft,
        id: Date.now(),
      });

      // reset draft after scheduling
      state.draft = {
        postType: "",
        postContent: "",
        scheduledAt: null,
      };
    },
    resetDraft(state) {
      state.draft = {
        postType: "",
        postContent: "",
        scheduledAt: null,
      };
    },
  },
});

export const {
  setPostType,
  setPostContent,
  setScheduledAt,
  addToScheduledPosts,
  resetDraft,
} = ScheduledPostSlice.actions;

export default ScheduledPostSlice.reducer;
