import { configureStore } from "@reduxjs/toolkit";

// IMPORTED REDUCERS
import OpenNdCloseRedcuer from "@/redux/slices/OpenNdCloseSlice";
import CalenderOpenNdCloseReducer from "@/redux/slices/CalenderOpenNdCloseSlice";
import SchedulePostDateAndTimeReducer from "@/redux/slices/SchdulePostTimeAndDate";
import SchedulrPostReducer from "@/redux/slices/SchdulePostsSlice";
import authSliceReducer from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    OpenNdClose: OpenNdCloseRedcuer,
    CalenderOpenNdClose: CalenderOpenNdCloseReducer,
    SchedulePostDateAndTime: SchedulePostDateAndTimeReducer,
    SchedulePost: SchedulrPostReducer,
    authSlice: authSliceReducer,
  },
});
