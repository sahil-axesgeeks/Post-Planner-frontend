"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ScheduleDate,
  ScheduleTime,
} from "@/redux/slices/SchdulePostTimeAndDate";
import { combineDateAndTime } from "../Calender/handlers/SchedulePostsTimeNdDateCombiner";

export default function DateAndMonthCalender() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const scheduleDateISO = useSelector(
    (state) => state.SchedulePostDateAndTime.date,
  );
  console.log(scheduleDateISO, "🎟🎟");

  // const scheduleTime = useSelector(
  //   (state) => state.SchedulePostDateAndTime.time,
  // );

  // FO THE TIME TO DISABLE THE PREVIOUS TIME
  const scheduleDate = useSelector(
    (state) => state.SchedulePostDateAndTime.scheduleDate,
  );
  const scheduleTime = useSelector(
    (state) => state.SchedulePostDateAndTime.scheduleTime,
  );

  const getMinTime = () => {
    if (!scheduleDate) return undefined;

    const today = new Date();
    const selected = new Date(scheduleDate);

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    // If selected date is today → disable past times
    if (selected.getTime() === today.getTime()) {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }

    // Future date → allow all times
    return undefined;
  };

  function toLocalDate(dateString) {
    if (!dateString) return undefined;
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d); // month is 0-indexed
  }

  const selectedDate = toLocalDate(scheduleDateISO);

  console.log(selectedDate, "🎄🎄");

  // CONVERT THE DATE AND TIME  IN THE COMBINED
  // const completeDate = combineDateAndTime(scheduleDateISO, scheduleTime);
  // console.log(completeDate);

  // GET THE CURRENT TIME
  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  useEffect(() => {
    if (!scheduleTime) {
      dispatch(ScheduleTime(getCurrentTime()));
    }
  }, []);

  useEffect(() => {
    if (!scheduleDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(scheduleDate);
    selected.setHours(0, 0, 0, 0);

    // If today & selected time is in the past → reset to now
    if (selected.getTime() === today.getTime()) {
      const minTime = getMinTime();
      if (scheduleTime && minTime && scheduleTime < minTime) {
        dispatch(ScheduleTime(minTime));
      }
    }
  }, [scheduleDate]);
  return (
    <div className="flex gap-3 w-fit">
      {/* DATE */}
      <div className="flex flex-col gap-3">
        <Label className="px-1">Date</Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-32 justify-between font-normal"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <Calendar
            mode="single"
            selected={selectedDate}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const checkDate = new Date(date);
              checkDate.setHours(0, 0, 0, 0);

              return checkDate < today; // ⬅️ disable only past dates
            }}
            onSelect={(date) => {
              console.log("ON SELECT FIRED:", date);

              if (!date) return;

              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, "0");
              const dd = String(date.getDate()).padStart(2, "0");

              dispatch(ScheduleDate(`${yyyy}-${mm}-${dd}`));
              setOpen(false);
            }}
          />
        </Popover>
      </div>

      {/* TIME */}
      <div className="flex flex-col gap-3">
        <Label className="px-1">Time DF</Label>

        <Input
          type="time"
          step="1"
          value={scheduleTime}
          min={getMinTime()}
          // STORE THE TIME AND DATE IN THE ON A SEPERATE SLICE
          onChange={(e) => dispatch(ScheduleTime(e.target.value))}
        />
      </div>
    </div>
  );
}
