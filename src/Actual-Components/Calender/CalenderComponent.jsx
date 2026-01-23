"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import CreatePostModelComponent from "./CreatePostModelComponent";

// REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";

// REDUX SLICES
import {
  togglePage,
  openPage,
  closePage,
} from "@/redux/slices/OpenNdCloseSlice";

import { ScheduleDate } from "@/redux/slices/SchdulePostTimeAndDate";

// IMPORTS
import { getTopPosition } from "@/Actual-Components/Calender/handlers/CardPosition";

export default function PostCalendar() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.OpenNdClose.isPageOpen);
  console.log(isOpen);

  const schedulePostDate = useSelector(
    (state) => state.SchedulePostDateAndTime.date,
  );
  // console.log("THE SCHEDULE DATE", schedulePostDate, "😘☀");

  const scheduledPosts = useSelector(
    (state) => state.SchedulePost.schedulePosts,
  );
  // console.log(scheduledPosts, "THE SCHEDULE POSTS IN CALENDER COMPONENT:");

  const userData = useSelector((state) => {
    return state.authSlice;
  });
  console.log(userData, "🚑🚑🚑🚑");

  const postsByDate = Array.isArray(scheduledPosts)
    ? scheduledPosts.reduce((acc, post) => {
        if (!post.scheduledAt) return acc;

        const date = post.scheduledAt.split("T")[0]; // "2026-01-06"

        if (!acc[date]) acc[date] = [];
        acc[date].push(post);

        return acc;
      }, {})
    : {};

  // console.log(postsByDate, "🚑🚑");

  // now send theschedule post to calculate the px

  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts, setPosts] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [postColor, setPostColor] = useState("emerald");

  const [isHovered, setIsHovered] = useState(null);

  const colorOptions = [
    { name: "emerald", bg: "bg-emerald-500", text: "text-emerald-500" },
    { name: "yellow", bg: "bg-yellow-400", text: "text-yellow-400" },
    { name: "rose", bg: "bg-rose-400", text: "text-rose-400" },
    { name: "purple", bg: "bg-purple-500", text: "text-purple-500" },
    { name: "blue", bg: "bg-blue-500", text: "text-blue-500" },
    { name: "orange", bg: "bg-orange-500", text: "text-orange-500" },
  ];

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);

    for (let i = 0; i < 60; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const navigateWeek = (direction) => {
    console.log(currentDate, "🤦‍♀️");
    setCurrentDate((prev) => {
      console.log("PREV:", prev); // TODAY COMPLETE DATE
      const newDate = new Date(prev);
      console.log("newDate:", newDate);
      newDate.setDate(prev.getDate() + direction * 25); // 19 + (-1 * 30)
      // return newDate;
      console.log(newDate);
      return newDate;
    });
  };

  const addPost = () => {
    if (!postTitle.trim()) return;

    const dateKey = formatDateKey(selectedDate);
    const newPost = {
      id: Date.now(),
      title: postTitle,
      description: postDescription,
      startTime,
      endTime,
      color: postColor,
    };

    setPosts((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newPost].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ),
    }));

    // setShowModal(false);
    dispatch(closePage(false));
    resetForm();
  };

  const resetForm = () => {
    setPostTitle("");
    setPostDescription("");
    setStartTime("09:00");
    setEndTime("10:00");
    setPostColor("emerald");
  };

  const deletePost = (dateKey, postId) => {
    setPosts((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((post) => post.id !== postId),
    }));
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getPostStyle = (startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const duration = endMinutes - startMinutes;

    const topOffset = ((startMinutes - 540) / 60) * 120;
    const height = (duration / 60) * 120;

    return {
      top: `${Math.max(0, topOffset)}px`,
      height: `${Math.max(80, height)}px`,
    };
  };

  const weekDates = getWeekDates();
  // console.log(weekDates);
  const today = new Date();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="h-screen bg-gray-50 flex flex-col mb-3">
      {/* Date Navigation Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          {/* LEFT BUTTON NAVIGATION */}
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          {/* <h3 className="text-sm font-semibold text-gray-700">
            Next 2 Months Schedule
          </h3> */}

          {/* RIGHT BUTTON NAVIGATION */}
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {weekDates.map((date, idx) => {
            const isToday = formatDateKey(date) === formatDateKey(today);

            return (
              <div
                key={idx}
                className={` text-center px-3 py-2 rounded-lg cursor-pointer transition ${
                  isToday ? "bg-blue-600" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedDate(date);
                  // setShowModal(true);
                  dispatch(togglePage(false));
                }}
              >
                <div
                  className={`text-xs mb-1 ${isToday ? "text-white font-semibold" : "text-gray-500"}`}
                >
                  {dayNames[date.getDay()]}
                </div>
                <div
                  className={`text-lg font-bold ${isToday ? "text-white" : "text-gray-900"}`}
                >
                  {date.getDate()}
                </div>
                <div
                  className={`text-xs ${isToday ? "text-white" : "text-gray-400"}`}
                >
                  {monthNames[date.getMonth()]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* THE MAIN DATES SHOWN ON THE BOTTOM OF ALL DATES */}
      <div className="flex-1  px-0 pb-4 overflow-x-auto">
        {/* HORIZONTAL SCROLL CONTAINER */}
        <div className="">
          <div className="min-w-max  ">
            {/* DATE HEADER */}
            <div className="flex border-b border-gray-300 sticky top-0 z-30 bg-white">
              <div className="w-20 shrink-0 border-r border-gray-200" />

              {weekDates.map((date, idx) => (
                <div
                  key={idx}
                  className="w-32 shrink-0 text-center font-semibold py-2 border-r border-gray-200"
                >
                  <div className="flex justify-center">
                    <Plus
                      onClick={() => {
                        dispatch(togglePage(false));
                        dispatch(ScheduleDate(date.toISOString()));
                      }}
                      className="w-5 h-5 text-white rounded-full bg-blue-400 cursor-pointer"
                    />
                  </div>
                  <div>{dayNames[date.getDay()]}</div>
                  {date.getDate()} {monthNames[date.getMonth()]}
                </div>
              ))}
            </div>

            {/* BODY */}
            <div className="flex sticky left-0">
              {/* TIME LABELS */}
              <div className="sticky left-0 z-30 bg-white">
                <div className="flex flex-col w-20 border-r border-gray-200">
                  {[
                    "12:00 AM",
                    "1:00 AM",
                    "2:00 AM",
                    "3:00 AM",
                    "4:00 AM",
                    "5:00 AM",
                    "6:00 AM",
                    "7:00 AM",
                    "8:00 AM",
                    "9:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM",
                    "7:00 PM",
                    "8:00 PM",
                    "9:00 PM",
                    "10:00 PM",
                    "11:00 PM",
                  ].map((time, idx) => (
                    <div
                      key={idx}
                      className="h-[100] pl-2 border-b border-gray-200 text-sm text-gray-500 pt-1"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* DAYS GRID */}

              <div className="flex">
                {weekDates.map((date, dayIdx) => {
                  const dateKey = formatDateKey(date); // "2026-01-24"
                  const dayPosts = postsByDate[dateKey] || [];

                  return (
                    <div
                      key={dayIdx}
                      className="relative flex flex-col w-32 shrink-0 border-r border-gray-200"
                    >
                      {/* TIME SLOTS */}
                      {[...Array(24)].map((_, timeIdx) => (
                        <div
                          key={timeIdx}
                          className="h-[100] border-b border-gray-200"
                        />
                      ))}

                      {/* 🔴 POSTS FOR THIS DAY */}
                      {dayPosts.map((post, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => setIsHovered(post.id)}
                          onMouseLeave={() => setIsHovered(null)}
                          className="absolute left-1 right-1 bg-blue-500 text-white text-xs rounded p-1 shadow max-h-12 flex-nowrap "
                          style={{
                            // backgroundColor: "#31c998",
                            top: `${getTopPosition(post.scheduledAt)}px`,
                          }}
                        >
                          {/* {post.postContent} */}
                          Facebook
                          {isHovered === post.id && (
                            <div className="absolute top-full z-20 right-0 mt-1 bg-[#31c998] text-white text-xs p-2 rounded">
                              <div className="mb-2">{post.scheduledAt}</div>
                              Scheduled at {post.postContent}
                            </div>
                          )}
                        </div>

                        // MAKING ON HOVER MAKE THE POST CONTNT VISIBLE
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAKE THIS STATE FROM THE REDUX STORE */}
      {isOpen && <CreatePostModelComponent></CreatePostModelComponent>}
    </div>
  );
}
