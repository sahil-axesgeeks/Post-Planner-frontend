import { useEffect } from "react";
import { setPostContent } from "@/redux/slices/SchdulePostsSlice";
import { setSchedule } from "@/redux/slices/SchdulePostTimeAndDate";
import { convertUTCToReduxSchedule } from "../utils/dateUtils";

export const useEditPostPrefill = ({
  isEditMode,
  singleFacebookPostContent,
  dispatch,
}) => {
  useEffect(() => {
    if (!isEditMode || !singleFacebookPostContent) return;

    const { caption, scheduledAt } = singleFacebookPostContent;

    console.log(caption, scheduledAt);
    if (caption) dispatch(setPostContent(caption));
    if (scheduledAt) {
      dispatch(setSchedule(scheduledAt));
      convertUTCToReduxSchedule(scheduledAt, dispatch);
    }
  }, [isEditMode, singleFacebookPostContent, dispatch]);
};
