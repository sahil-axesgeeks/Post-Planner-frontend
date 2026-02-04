"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
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

  const scheduleTime = useSelector(
    (state) => state.SchedulePostDateAndTime.time,
  );

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
            onSelect={(date) => {
              console.log("ON SELECT FIRED:", date);

              if (!date) return;
              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
              const dd = String(date.getDate()).padStart(2, "0");

              dispatch(ScheduleDate(`${yyyy}-${mm}-${dd}`));
              setOpen(false);
            }}
          />
        </Popover>
      </div>

      {/* TIME */}
      <div className="flex flex-col gap-3">
        <Label className="px-1">Time</Label>

        <Input
          type="time"
          step="1"
          value={scheduleTime}
          // STORE THE TIME AND DATE IN THE ON A SEPERATE SLICE
          onChange={(e) => dispatch(ScheduleTime(e.target.value))}
        />
      </div>
    </div>
  );
}
