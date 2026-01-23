"use client";

import { useSelector } from "react-redux";
import ScheduledCard from "./ScheduledCard";
const HOUR_HEIGHT = 60;

export default function DayTimeline() {
  const posts = useSelector((state) => state.SchedulePost.schedulePosts);

  return (
    <div className="relative h-[1440] border-l">
      {/* Hour grid */}
      {Array.from({ length: 24 }).map((_, hour) => (
        <div
          key={hour}
          className="relative h-[60] border-b text-xs text-gray-400"
        >
          <span className="absolute -left-12 top-1">
            {hour.toString().padStart(2, "0")}:00
          </span>
        </div>
      ))}

      {/* Scheduled cards */}
      {posts.map((post, index) => (
        <ScheduledCard key={index} post={post} />
      ))}
    </div>
  );
}
