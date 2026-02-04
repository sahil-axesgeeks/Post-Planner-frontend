import { configureStore } from "@reduxjs/toolkit";

// IMPORTED REDUCERS
import OpenNdCloseRedcuer from "@/redux/slices/OpenNdCloseSlice";
import CalenderOpenNdCloseReducer from "@/redux/slices/CalenderOpenNdCloseSlice";
import SchedulePostDateAndTimeReducer from "@/redux/slices/SchdulePostTimeAndDate";
import SchedulrPostReducer from "@/redux/slices/SchdulePostsSlice";
import authSliceReducer from "@/redux/slices/authSlice";
import fetchPagesReducer from "@/redux/slices/pagesListsSlice";
import handleSelectorReduer from "@/redux/slices/handlersSelectors/handlerSelectorSlice";
import FacebookPostContentReducer from "../slices/facebookSlice/SingleFacebookPostContentSlice";

import facebookScheduleReducer from "@/redux/slices/facebookSlice/facebookScheduledPostSlice";

import FacebookAllScheduledPostReducer from "@/redux/slices/facebookSlice/facebookAllScheduledPostSlice";

export const store = configureStore({
  reducer: {
    OpenNdClose: OpenNdCloseRedcuer,
    CalenderOpenNdClose: CalenderOpenNdCloseReducer,
    SchedulePostDateAndTime: SchedulePostDateAndTimeReducer,
    SchedulePost: SchedulrPostReducer,
    authSlice: authSliceReducer,
    fetchPages: fetchPagesReducer,
    handleSelector: handleSelectorReduer,
    singleFacebookPostContent: FacebookPostContentReducer,
    // THESE ARE 2DUPLICATES
    facebookAllScheduledPosts: FacebookAllScheduledPostReducer,
    facebookSchedule: facebookScheduleReducer,
  },
});
