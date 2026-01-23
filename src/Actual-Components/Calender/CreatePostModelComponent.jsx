"use client";

import React, { useState } from "react";
import {
  X,
  Image,
  Plus,
  ChevronDown,
  Smile,
  Hash,
  Wand2,
  Info,
  Calendar,
} from "lucide-react";

// SLICES
import { useDispatch, useSelector } from "react-redux";
import { ToggleCalender } from "@/redux/slices/CalenderOpenNdCloseSlice";
import { togglePage } from "@/redux/slices/OpenNdCloseSlice";
import { addToSchdeuledPosts } from "@/redux/slices/SchdulePostsSlice";

// import { handleClickedScheduled } from "@/Actual-Components/Calender/handlers/CalenderHandlers";
import DateAndMonthCalender from "@/Actual-Components/DateNdMonthCalender/DateNdMonthCalender";
import { combineDateAndTime } from "./handlers/SchedulePostsTimeNdDateCombiner";

export default function CreatePostModelComponent() {
  const [postType, setPostType] = useState("post");
  const [postContent, setPostContent] = useState("");

  // WORK ON LATER
  const [firstComment, setFirstComment] = useState("");
  const [createAnother, setCreateAnother] = useState(false);

  const dispatch = useDispatch();

  const isCalenderOpen = useSelector(
    (state) => state.CalenderOpenNdClose.isCalenderOpen,
  );

  const postingDate = useSelector(
    (state) => state.SchedulePostDateAndTime.date,
  );

  const schedulePostDate = useSelector(
    (state) => state.SchedulePostDateAndTime.date,
  );
  console.log("THE SCHEDULE DATE", schedulePostDate, "😘☀");

  const schedulePostTime = useSelector(
    (state) => state.SchedulePostDateAndTime.time,
  );
  console.log("THE SCHEDULE Time", schedulePostTime, "😘☀");

  const completeDateAndTime = combineDateAndTime(
    schedulePostDate,
    schedulePostTime,
  );
  console.log("THE SCHEDULE Time", completeDateAndTime);

  const scheduledPosts = useSelector((state) => state.SchedulePost);
  console.log(scheduledPosts, "THE POSTSARE 🎁🎁");
  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm" />

      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex relative">
          {/* LEFT PANEL - Post Creation */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create Post
                </h2>
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                  🏷️ Tags
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <Wand2 className="w-4 h-4" />
                  AI Assistant
                </button>
                <button className="px-4 py-1.5 text-sm font-medium text-violet-600 border border-violet-300 bg-violet-50 hover:bg-violet-100 rounded-md transition-colors">
                  Preview
                </button>
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors ml-1"
                  onClick={() => dispatch(togglePage(false))}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Social Accounts Section */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-3">
                {/* Account 1 */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full  from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    C
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-white">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                </div>

                {/* Account 2 */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    S
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center ring-2 ring-white">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                      <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Post Type Selection */}
              <div className="flex items-center gap-6 mb-6">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>

                <div className="flex gap-8">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="postType"
                      value="post"
                      checked={postType === "post"}
                      onChange={(e) => setPostType(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Post
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="postType"
                      value="reel"
                      checked={postType === "reel"}
                      onChange={(e) => setPostType(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Reel
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="postType"
                      value="story"
                      checked={postType === "story"}
                      onChange={(e) => setPostType(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Story
                    </span>
                  </label>
                </div>
              </div>

              {/* Text Input */}
              <textarea
                placeholder="What would you like to share?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full min-h-[140] p-0 text-[15px] leading-relaxed border-0 resize-none focus:outline-none placeholder-gray-400 text-gray-900"
              />

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6 hover:border-gray-400 transition-colors bg-gray-50/50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Drag & drop or{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                      select a file
                    </button>
                  </p>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 mb-6 pb-6 border-b border-gray-200">
                <button
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Add content"
                >
                  <Plus className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="More options"
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Add emoji"
                >
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Add hashtag"
                >
                  <Hash className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="AI tools"
                >
                  <Wand2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* First Comment Section */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    First Comment
                  </label>
                  <button className="w-7 h-7  from-purple-600 to-pink-600 rounded-md flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm">
                    <Wand2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Your comment"
                  value={firstComment}
                  onChange={(e) => setFirstComment(e.target.value)}
                  className="w-full text-sm border-0 p-0 focus:outline-none placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50/50">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={createAnother}
                  onChange={(e) => setCreateAnother(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Create Another
                </span>
              </label>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Save Drafts
                </button>

                <button
                  onClick={() => dispatch(ToggleCalender(true))}
                  className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  {/* Next Available */}
                  {completeDateAndTime ? (
                    <span>
                      {new Date(completeDateAndTime).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  ) : (
                    <span>Schedule a post</span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const scheduledAt = combineDateAndTime(
                      schedulePostDate,
                      schedulePostTime,
                    );

                    dispatch(
                      addToSchdeuledPosts({
                        postType,
                        postContent,
                        scheduledAt,
                      }),
                    );
                  }}
                  className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Schedule Posts
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Preview */}
          <div className="w-96  from-gray-50 to-gray-100 border-l border-gray-200 flex flex-col">
            <div className="p-5 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  Facebook Preview
                </h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-56 h-72 bg-white rounded-xl shadow-lg mb-4 mx-auto flex items-center justify-center p-6">
                  <div className="w-full">
                    <div className="w-14 h-14  from-gray-200 to-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="space-y-2.5">
                      <div className="h-2.5 w-3/4 bg-gray-200 rounded-full mx-auto"></div>
                      <div className="h-2.5 w-1/2 bg-gray-200 rounded-full mx-auto"></div>
                      <div className="h-2 w-2/3 bg-gray-100 rounded-full mx-auto mt-4"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  See your post's preview here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR MODAL */}
      {isCalenderOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/5 z-40 backdrop-blur-sm"
            onClick={() => dispatch(ToggleCalender(false))}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-5 relative w-[320] max-w-full">
              <button
                onClick={() => dispatch(ToggleCalender(false))}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-md transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              <DateAndMonthCalender />
            </div>
          </div>
        </>
      )}
    </>
  );
}
