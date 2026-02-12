"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
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

// SLICES
import {
  ScheduleDate,
  ScheduleTime,
} from "@/redux/slices/SchdulePostTimeAndDate";

// HELPERS
import { combineDateAndTime } from "../Calender/handlers/SchedulePostsTimeNdDateCombiner";
import { formatISTDateTime } from "../Calender/handlers/ChangeDateUtcToIst";

export default function DateAndMonthCalender() {
  // Local IST values just for display
  const [istDate, setIstDate] = useState(""); // "YYYY-MM-DD"
  const [istTime, setIstTime] = useState(""); // "HH:MM"
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // Redux: raw selected date & time ("YYYY-MM-DD" and "HH:MM:SS")
  const scheduleDate = useSelector(
    (state) => state.SchedulePostDateAndTime.date,
  );
  // console.log(scheduleDate, "🎫🎫🎫🎫");
  const scheduleTime = useSelector(
    (state) => state.SchedulePostDateAndTime.time,
  );
  console.log(scheduleTime, "👘👘");

  // Date object for calendar and button label
  const selectedDate = useMemo(() => {
    if (!scheduleDate) return undefined;
    return new Date(scheduleDate + "T00:00:00");
  }, [scheduleDate]);
  // console.log(scheduleDate, "🦺🦺🦺");

  // 🎃
  // Minimum time for today
  const getMinTime = () => {
    if (!scheduleDate) return undefined;

    const today = new Date();
    const selected = new Date(scheduleDate + "T00:00:00");

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() === today.getTime()) {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      console.log(`${hh}:${mm}:${ss}`, "🥻");
      return `${hh}:${mm}:${ss}`; // only for input min
    }

    return undefined;
  };

  // Get current time as "HH:MM:SS"
  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  // Initialize time once, if empty
  useEffect(() => {
    if (!scheduleTime) {
      dispatch(ScheduleTime(getCurrentTime()));
    }
  }, []); // run once

  // Ensure time is not in the past when date changes to today
  useEffect(() => {
    if (!scheduleDate || !scheduleTime) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(scheduleDate + "T00:00:00");
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() === today.getTime()) {
      const minTime = getMinTime(); // "HH:MM"
      if (minTime) {
        const currentHHMM = scheduleTime.slice(0, 5); // from "HH:MM:SS"
        if (currentHHMM < minTime) {
          // keep format HH:MM:SS by adding seconds
          dispatch(ScheduleTime(`${minTime}:00`));
        }
      }
    }
  }, [scheduleDate, scheduleTime, dispatch]);

  // Build scheduled datetime and derive IST date/time for display
  useEffect(() => {
    if (!scheduleDate || !scheduleTime) return;

    const scheduledDateTime = combineDateAndTime(scheduleDate, scheduleTime);
    const { date, time } = formatISTDateTime(scheduledDateTime);
    setIstDate(date); // "YYYY-MM-DD"
    setIstTime(time); // "HH:MM"
  }, [scheduleDate, scheduleTime]);

  // Calendar date change handler – updates Redux date
  const handleDateSelect = (date) => {
    if (!date) return;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    dispatch(ScheduleDate(`${yyyy}-${mm}-${dd}`));
    setOpen(false);
  };

  // Time change handler – keep Redux time as "HH:MM:SS"
  const handleTimeChange = (e) => {
    const value = e.target.value; // "HH:MM"
    if (!value) return;
    const [h, m] = value.split(":");
    const currentSeconds = scheduleTime?.split(":")[2] || "00";
    dispatch(ScheduleTime(`${h}:${m}:${currentSeconds}`)); // still HH:MM:SS
  };

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div className="flex gap-3">
        {/* DATE */}
        <div className="flex flex-col gap-3">
          <Label className="px-1">Date</Label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-32 justify-between font-normal bg-pink-200"
              >
                {selectedDate
                  ? selectedDate.toISOString().split("T")[0]
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 z-[9999] bg-white">
              <Calendar
                className="bg-white w-52"
                mode="single"
                selected={selectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const checkDate = new Date(date);
                  checkDate.setHours(0, 0, 0, 0);
                  return checkDate < today;
                }}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* TIME */}
        <div className="flex flex-col gap-3">
          <Label className="px-1">Time</Label>

          <Input
            className=" bg-red-100"
            type="time"
            step="1"
            value={scheduleTime.slice(0, 5) || ""} // input sees "HH:MM"
            min={getMinTime()}
            onChange={handleTimeChange}
          />
        </div>
      </div>

      {/* Read-only IST preview */}
      {istDate && istTime && (
        <div className="text-xs text-gray-600 px-1">
          Scheduled (IST): <span className="font-medium">{istDate}</span>{" "}
          <span className="font-medium">{istTime}</span>
        </div>
      )}
    </div>
  );
}
