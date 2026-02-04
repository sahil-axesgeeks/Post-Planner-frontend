"use client";

import React, { use, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CreatePostModelComponent from "./CreatePostModelComponent";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { togglePage, togglePageEdit } from "@/redux/slices/OpenNdCloseSlice";
import { ScheduleDate } from "@/redux/slices/SchdulePostTimeAndDate";

import { FacebookAllScheduledPostsThunk } from "@/redux/thunks/facebookThunks/FacebookAllScheduledPostsListThunk";

import { fetchSingleFacebookPostThunk } from "@/redux/thunks/facebookThunks/SingleFacebookPostContentThunk";
// import EditPostContent from "../EditPostComponent/EditPostContent";
import CreateEditPostComponent from "./CreatePostModelComponent";

export default function PostCalendar() {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledPostData, setScheduledPostData] = useState(null);

  const isOpen = useSelector((state) => state.OpenNdClose.isPageOpen);
  const isPageOpenEdit = useSelector(
    (state) => state.OpenNdClose.isPageOpenEdit,
  );

  // ALL SCHEDULED POSTS FETCHING ALL
  const listScheduledPosts = useSelector(
    (state) => state.facebookAllScheduledPosts.allScheduledPosts,
  );

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const navigateMonth = (dir) => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + dir);
      return d;
    });
  };

  const formatTime = (dateTime) =>
    new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth();

  const schedulePostList = listScheduledPosts?.scheduledPosts || [];
  // console.log(schedulePostList);
  const postsByDate = Array.isArray(schedulePostList)
    ? schedulePostList.reduce((acc, post) => {
        if (!post?.scheduledAt) return acc;

        const key = formatDateKey(new Date(post.scheduledAt));
        acc[key] = acc[key] || [];
        acc[key].push(post);
        return acc;
      }, {})
    : {};

  const monthDays = getMonthDays();
  const today = new Date();

  // DOING THIS FOR FETCHING THE SCHEDULDED POSTS OF THE PARTICULAR MONTH
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based

  const startOfMonth = new Date(year, month, 1, 0, 0, 0);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const startUTC = startOfMonth.toISOString();
  const endUTC = endOfMonth.toISOString();

  const startEndDate = { startUTC, endUTC };
  // CREATE POST HANDLER
  const handleCreatePost = (selectedDate = new Date()) => {
    dispatch(togglePage(true));
    // dispatch(ScheduleDate(selectedDate.toISOString()));
  };

  // EDIT POST HANDLER
  const handleEditPost = async (post) => {
    try {
      setScheduledPostData(post);
      console.log(post, "THE POST GOING TO EDITING");
      dispatch(fetchSingleFacebookPostThunk(post.postTemplateId));

      dispatch(togglePageEdit(true));
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // CLOSE EDIT MODAL
  const handleCloseEdit = () => {
    dispatch(togglePageEdit(false));
    setScheduledPostData(null);
  };

  // FOR FETCHING ALL-SCHEDULED-POSTS
  useEffect(() => {
    if (!startUTC || !endUTC) return;

    dispatch(FacebookAllScheduledPostsThunk(startEndDate));
  }, [startUTC, endUTC, dispatch]);

  console.log();

  const FacebookIcon = () => (
    <svg
      className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3"
      viewBox="0 0 24 24"
      fill="#1877F2"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const getStatusClasses = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 border-green-400 hover:bg-green-200";
      case "failed":
        return "bg-red-100 border-red-400 hover:bg-red-200";
      case "scheduled":
      default:
        return "bg-blue-100 border-blue-400 hover:bg-blue-200";
    }
  };

  const FacebookIconNew = ({ color }) => (
    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill={color}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
  const getIconColor = (status) => {
    switch (status) {
      case "published":
        return "#16a34a"; // green
      case "failed":
        return "#dc2626"; // red
      case "scheduled":
      default:
        return "#1877F2"; // facebook blue
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>

          <button onClick={() => navigateMonth(-1)}>
            <ChevronLeft />
          </button>

          <button onClick={() => navigateMonth(1)}>
            <ChevronRight />
          </button>
        </div>

        {/* SCHEDULE BUTTON */}
        <button
          onClick={() => handleCreatePost()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Schedule
        </button>
      </div>

      {/* GRID */}
      <div className="flex-1 p-4 grid grid-cols-7 gap-2">
        {monthDays.map((date, idx) => {
          const dateKey = formatDateKey(date);
          const dayPosts = postsByDate[dateKey] || [];

          const MAX_VISIBLE_POSTS = 6;
          const visiblePosts = dayPosts.slice(0, MAX_VISIBLE_POSTS);
          const extraCount = dayPosts.length - MAX_VISIBLE_POSTS;

          const isToday = formatDateKey(date) === formatDateKey(today);
          const isOtherMonth = !isCurrentMonth(date);

          return (
            <div
              key={idx}
              className={`border rounded p-2 min-h-[110px] flex flex-col ${
                isToday ? "border-blue-500 bg-blue-50" : "bg-white"
              } ${isOtherMonth ? "opacity-40" : ""}`}
            >
              {/* DATE */}
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{date.getDate()}</span>

                <button onClick={() => handleCreatePost(date)}>
                  <Plus size={14} />
                </button>
              </div>

              {/* POSTS */}
              <div className="flex flex-wrap gap-1">
                {visiblePosts.map((post) => (
                  <div
                    key={post._id}
                    title={`${formatTime(post.scheduledAt)} • ${post.status}`}
                    onClick={() => handleEditPost(post)}
                    className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition
        ${getStatusClasses(post.status)}
      `}
                  >
                    <FacebookIcon color={getIconColor(post.status)} />
                  </div>
                ))}
                {extraCount > 0 && (
                  <div className="w-full text-xs font-semibold text-gray-600">
                    +{extraCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isPageOpenEdit && scheduledPostData && (
        <CreateEditPostComponent
          data={scheduledPostData}
          isEditMode={true}
          onClose={handleCloseEdit}
        />
      )}

      {/* CREATE MODAL */}
      {isOpen && <CreateEditPostComponent isEditMode={false} />}
    </div>
  );
}
