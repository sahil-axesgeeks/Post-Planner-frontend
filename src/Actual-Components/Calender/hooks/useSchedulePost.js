import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { scheduleFacebookPostThunk } from "@/redux/thunks/facebookThunks/facebookScheduledPostThunk";
import {
  addToScheduledPosts,
  resetDraft,
} from "@/redux/slices/SchdulePostsSlice";
import { updateScheduledPostApi } from "@/api/facebookAgainSchedulePost/facebookAgainSchedulePostApi";

export const useSchedulePost = () => {
  const dispatch = useDispatch();

  const createSchedule = useCallback(
    (payload) => {
      console.log("🥼THE PAYLOAD OF THE CREATE-SCHEDULE-POST", payload);
      dispatch(scheduleFacebookPostThunk(payload));
      dispatch(addToScheduledPosts());
    },
    [dispatch],
  );

  const editSchedule = useCallback(
    async (id, payload) => {
      console.log(
        payload,
        "THE PAYLOAD WHICH IS I HAVE GOT IN THE EDIT-SCHEDULE",
      );
      await updateScheduledPostApi(id, payload);
      dispatch(resetDraft());
    },
    [dispatch],
  );

  return { createSchedule, editSchedule };
};
