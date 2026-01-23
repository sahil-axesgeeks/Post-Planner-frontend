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
  const scheduleTime = useSelector(
    (state) => state.SchedulePostDateAndTime.time,
  );

  const selectedDate = scheduleDateISO ? new Date(scheduleDateISO) : null;

  // CONVERT THE DATE AND TIME  IN THE COMBINED
  const completeDate = combineDateAndTime(scheduleDateISO, scheduleTime);
  console.log(completeDate);

  return (
    <div className="flex gap-3">
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

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={(d) => {
                dispatch(ScheduleDate(d.toISOString()));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* TIME */}
      <div className="flex flex-col gap-3">
        <Label className="px-1">Time</Label>

        <Input
          type="time"
          step="1"
          value={scheduleTime}
          onChange={(e) => dispatch(ScheduleTime(e.target.value))}
        />
      </div>
    </div>
  );
}
