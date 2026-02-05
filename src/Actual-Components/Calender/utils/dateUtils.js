import { formatISTDateTime } from "../handlers/ChangeDateUtcToIst";
import {
  ScheduleDate,
  ScheduleTime,
} from "@/redux/slices/SchdulePostTimeAndDate";
export const convertUTCToReduxSchedule = (utcString, dispatch) => {
  const { date, time } = formatISTDateTime(utcString); //THE IST DATE-TIME COMES
  dispatch(ScheduleDate(date));
  dispatch(ScheduleTime(time));
};
