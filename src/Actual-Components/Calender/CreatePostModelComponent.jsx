"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import { Facebook, Linkedin, Instagram, Check } from "lucide-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import DateAndMonthCalender from "@/Actual-Components/DateNdMonthCalender/DateNdMonthCalender";
import { combineDateAndTime } from "../Calender/handlers/SchedulePostsTimeNdDateCombiner";
import { formatISTDateTime } from "../Calender/handlers/ChangeDateUtcToIst";
import { updateScheduledPostApi } from "@/api/facebookAgainSchedulePost/facebookAgainSchedulePostApi";
// SLICES

import { ToggleCalender } from "@/redux/slices/CalenderOpenNdCloseSlice";
import { togglePage, togglePageEdit } from "@/redux/slices/OpenNdCloseSlice";

import {
  addToScheduledPosts,
  setPostType,
  setPostContent,
  resetDraft,
} from "@/redux/slices/SchdulePostsSlice";
// SCHEDULE-POST DATE AND TIME
import {
  setSchedule,
  ScheduleDate,
  ScheduleTime,
} from "@/redux/slices/SchdulePostTimeAndDate";

// THUNKS
import { scheduleFacebookPostThunk } from "@/redux/thunks/facebookThunks/facebookScheduledPostThunk";

export default function CreateEditPostComponent({ data, isEditMode = false }) {
  const dispatch = useDispatch();

  const [firstComment, setFirstComment] = useState("");
  const [createAnother, setCreateAnother] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pageId, setPageId] = useState([]);

  // USE-SELECTORS
  const {
    postType,
    postContent,

    // THE POST GOING TO SCHEDULE DATE-TIME
    scheduleTime,
    scheduleDate,

    schedulePostData,
    // FETCHING THE SINGLE POST
    singleFacebookPostContent,

    isCalenderOpen,
    fetchPagesList,
  } = useSelector(
    (state) => ({
      postType: state.SchedulePost.draft.postType,
      postContent: state.SchedulePost.draft.postContent,

      // THE POST GOING TO SCHEDULE DATE-TIME
      scheduleTime: state.SchedulePostDateAndTime.time,
      scheduleDate: state.SchedulePostDateAndTime.date,

      //
      schedulePostData: state.SchedulePost.draft,

      //FETCHING THE SINGLE POST CONTENT
      singleFacebookPostContent:
        state.singleFacebookPostContent.singleFacebookPost,

      isCalenderOpen: state.CalenderOpenNdClose.isCalenderOpen,
      fetchPagesList: state.fetchPages.pages,
    }),
    shallowEqual,
  );
  // console.log(schedulePostData, "🧿");

  // SCHEDULED TIME-DATE-COMBINED
  const completeDateAndTime = combineDateAndTime(scheduleDate, scheduleTime);

  // MEMOIZED-CONNECTED-PAGE-FUNCTION (for create mode)
  const mappedPages = useMemo(() => {
    if (isEditMode) return [];
    return (
      fetchPagesList?.data?.map((page) => ({
        id: page.pageId,
        pageName: page.pageName,
        letter: page.pageName[0].toUpperCase(),
        color: "bg-blue-500",
        platform: page.platform,
        icon: Facebook,
        connected: true,
      })) || []
    );
  }, [fetchPagesList?.data, isEditMode]);

  const instagramMappedPages = useMemo(() => {
    if (isEditMode) return [];
    return (
      fetchPagesList?.instagramPages?.map((page) => ({
        id: page.pageId,
        title: page.pageName,
        pageName: page.pageName,
        icon: Instagram,
        letter: page.pageName[0].toUpperCase(),
        platform: page.platform,
        color: "bg-pink-50",
        iconColor: "text-pink-600",
        borderColor: "border-pink-200",
        connected: true,
      })) || []
    );
  }, [fetchPagesList?.instagramPages, isEditMode]);

  // FOR MAKING THE SELECTION BETWEEN THE HANDLERS
  const handleClick = (page) => {
    setPageId((prev) => {
      console.log("SETTING THE PAGE🥽🥽");
      const exists = prev.some(
        (p) => p.id === page.id && p.platform === page.platform,
      );

      if (exists) {
        return prev.filter(
          (p) => !(p.id === page.id && p.platform === page.platform),
        );
      }

      return [
        ...prev,
        { id: page.id, platform: page.platform, pageName: page.pageName },
      ];
    });
  };

  const HandleSetSchedule = () => {
    // dispatch(setScheduledAt(completeDateAndTime));

    const userData = {
      caption: schedulePostData.postContent,
      page_id: pageId,
      scheduledAt: completeDateAndTime,
    };

    console.log(userData, "🎆THE SCHEDULE-POST-DATA");

    // DISPATCHING THE EVENT FOR CRETING A SCHEDULE POST
    dispatch(scheduleFacebookPostThunk(userData));

    dispatch(addToScheduledPosts());
  };

  // MAKING THIS FOR THE EDIT POST GOING AGAIN FOR THE SCHEDULE
  const handleScheduleEditPostAgainSchedule = async () => {
    console.log("MAKING THE POST AGAIN SCHEDULE");
    // console.log();
    if (!data) {
      return console.log("NO DATA FOUND FOR THE POST");
    }
    console.log(data, "🎿🎿🎿🎿🎿🎿🎿🎿🎿🎿");
    const updatePayload = {
      postTemplateId: data?.postTemplateId,
      connectedAccountPageId: data?.connectedAccountPageId,
      scheduledAt: completeDateAndTime,
      postType: schedulePostData?.postType,
      caption: schedulePostData?.postContent,
    };
    console.log(updatePayload, "🥊🥊🥊🥊🥊🥊🥊🥊🥊🥊🥊");
    console.log(schedulePostData);
    await updateScheduledPostApi(data._id, updatePayload);

    dispatch(resetDraft());
  };

  // FOR DECODING THE UTC TO IST
  const setScheduleFromUTC = (utcString) => {
    const { date, time } = formatISTDateTime(utcString);
    console.log(date, time);
    dispatch(ScheduleDate(date));
    dispatch(ScheduleTime(time));
  };

  // FOR EDIT MODE - Load existing post data
  useEffect(() => {
    if (!isEditMode || !singleFacebookPostContent) return;

    const { caption, scheduledAt } = singleFacebookPostContent;

    if (caption) dispatch(setPostContent(caption));

    // GOT THE SCHEDULEDAT --> NOW SENDING THE DATE-TIME TO THE SCHEDULE-POST-TIME-DATE SLICE--> SCHEDULETIME-SCHEDULE-DATE
    if (scheduledAt) {
      // dispatch(ScheduleDate())
      // dispatch(scheduleTime())
      // dispatch(setScheduledAt(scheduledAt));

      // THIS SCHEDULE THE DATE-TIME
      dispatch(setSchedule(scheduledAt));
    }

    if (schedulePostData?.scheduledAt)
      setScheduleFromUTC(schedulePostData.scheduledAt);
  }, [
    singleFacebookPostContent,
    schedulePostData?.scheduledAt,
    dispatch,
    isEditMode,
  ]);

  // console.log(schedulePostData, "THE SCHEDULED POST DATA");

  // console.log(scheduleDate, scheduleTime, "🎄");

  // Handle close based on mode
  const handleClose = () => {
    if (isEditMode) {
      dispatch(togglePageEdit(false));
      console.log("EDIT PAGE RESET");
      dispatch(resetDraft());
    } else {
      dispatch(togglePage(false));
      console.log(" PAGE RESET");
      dispatch(resetDraft());
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />

      {/* MAIN MODAL - Made responsive */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden max-w-6xl sm:w-[95vw]">
          {/* LEFT PANEL */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header - Made sticky on mobile */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {isEditMode ? "Edit Post" : "Create Post"}
                </h2>
                <div className="hidden sm:flex items-center gap-2">
                  <button className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors font-medium">
                    🏷️ Tags
                  </button>
                  <button className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 rounded-md hover:from-purple-100 hover:to-pink-100 transition-colors font-medium">
                    AI Assistant
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors font-medium lg:hidden"
                  >
                    {showPreview ? "Edit" : "Preview"}
                  </button>
                </div>
              </div>

              {/* Mobile preview toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden px-2.5 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  {showPreview ? "← Edit" : "Preview →"}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content wrapper - Shows either editor or preview on mobile */}
            <div className="flex-1 overflow-y-auto">
              {/* Editor - Hidden on mobile when preview is shown */}
              <div
                className={`${showPreview ? "hidden lg:block" : "block"} h-full`}
              >
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  {/* Social Accounts Section - Show connected accounts in edit mode, selectable in create mode */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                      Social Accounts
                    </h3>
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {isEditMode ? (
                        // EDIT MODE - Show connected accounts from data prop
                        data?.connectedAccountPageId?.map((page) => {
                          const platform =
                            page.platform === "Facebook"
                              ? {
                                  gradient:
                                    "linear-gradient(135deg, #3b82f6, #2563eb)",
                                  glow: "rgba(59, 130, 246, 0.25)",
                                  bg: "rgba(59, 130, 246, 0.06)",
                                  border: "rgba(59, 130, 246, 0.2)",
                                  text: "#1d4ed8",
                                  dot: "#3b82f6",
                                  icon: (
                                    <svg
                                      className="w-3 h-3"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                  ),
                                }
                              : page.platform === "Instagram"
                                ? {
                                    gradient:
                                      "linear-gradient(135deg, #ec4899, #a855f7)",
                                    glow: "rgba(236, 72, 153, 0.25)",
                                    bg: "rgba(236, 72, 153, 0.06)",
                                    border: "rgba(236, 72, 153, 0.2)",
                                    text: "#be185d",
                                    dot: "#ec4899",
                                    icon: (
                                      <svg
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                      >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                      </svg>
                                    ),
                                  }
                                : {
                                    gradient:
                                      "linear-gradient(135deg, #6b7280, #4b5563)",
                                    glow: "rgba(107, 114, 128, 0.2)",
                                    bg: "rgba(107, 114, 128, 0.06)",
                                    border: "rgba(107, 114, 128, 0.2)",
                                    text: "#374151",
                                    dot: "#6b7280",
                                    icon: (
                                      <svg
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                      >
                                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                                      </svg>
                                    ),
                                  };

                          return (
                            <span
                              key={page._id}
                              className="inline-flex items-center gap-2 transition-all duration-300 cursor-default group"
                              style={{
                                padding: "7px 14px",
                                borderRadius: "999px",
                                background: platform.bg,
                                border: `1px solid ${platform.border}`,
                                color: platform.text,
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.03em",
                                boxShadow: `0 2px 8px ${platform.glow}`,
                              }}
                              // onMouseEnter={(e) => {
                              //   e.currentTarget.style.transform =
                              //     "translateY(-2px) scale(1.04)";
                              //   e.currentTarget.style.boxShadow = `0 6px 20px ${platform.glow}`;
                              // }}
                              onClick={() => handleClick(page)}
                              // onMouseLeave={(e) => {
                              //   e.currentTarget.style.transform =
                              //     "translateY(0) scale(1)";
                              //   e.currentTarget.style.boxShadow = `0 2px 8px ${platform.glow}`;
                              // }}
                            >
                              <span
                                className="inline-flex items-center justify-center flex-shrink-0"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "6px",
                                  background: platform.gradient,
                                  color: "#fff",
                                  boxShadow: `0 2px 6px ${platform.glow}`,
                                }}
                              >
                                {platform.icon}
                              </span>
                              <span style={{ lineHeight: 1.2 }}>
                                {page.pageName}
                              </span>
                            </span>
                          );
                        })
                      ) : (
                        // CREATE MODE - Show selectable accounts
                        <>
                          {mappedPages.map((page) => (
                            <button
                              onClick={() => handleClick(page)}
                              key={page.id}
                              className="flex shrink-0 items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 border-blue-200 bg-blue-50/50 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all min-w-[120px] sm:min-w-0"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white items-center justify-center font-bold text-sm sm:text-base flex shrink-0">
                                {page.letter}
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                  {page.pageName}
                                </p>
                              </div>
                            </button>
                          ))}

                          {instagramMappedPages.map((page) => (
                            <button
                              onClick={() => handleClick(page)}
                              key={page.id}
                              className={`flex shrink-0 items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 ${page.borderColor} ${page.color} rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all min-w-[120px] sm:min-w-0`}
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-500 text-white items-center justify-center font-bold text-sm sm:text-base flex shrink-0">
                                {page.letter}
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                  {page.pageName}
                                </p>
                              </div>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="space-y-4 sm:space-y-5">
                    {/* Post Type Selection - Better mobile layout */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {["post", "reel", "story"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="postType"
                            value={type}
                            checked={postType === type}
                            onChange={(e) =>
                              dispatch(setPostType(e.target.value))
                            }
                            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="text-sm sm:text-base font-medium text-gray-700 capitalize group-hover:text-gray-900">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Textarea - Better touch target */}
                    <textarea
                      placeholder="What do you want to share?"
                      value={postContent}
                      onChange={(e) => dispatch(setPostContent(e.target.value))}
                      className="w-full min-h-[140px] sm:min-h-[160px] p-3 sm:p-4 text-sm sm:text-base leading-relaxed border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900 rounded-lg bg-white"
                    />

                    {/* File Upload Area - Better mobile layout */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-10 text-center hover:border-gray-400 transition-colors bg-gray-50/50">
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center">
                          <Image className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Drag & drop or{" "}
                          <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                            select a file
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Toolbar - Better mobile spacing */}
                    <div className="flex flex-wrap gap-2">
                      {[Plus, ChevronDown, Smile, Hash, Wand2].map(
                        (Icon, idx) => (
                          <button
                            key={idx}
                            className="p-2.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Icon className="w-5 h-5 text-gray-500" />
                          </button>
                        ),
                      )}
                    </div>

                    {/* First Comment - Better mobile layout */}
                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <label className="text-xs sm:text-sm font-semibold text-gray-700">
                          First Comment
                        </label>
                        <button className="w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm">
                          <Wand2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Your comment"
                        value={firstComment}
                        onChange={(e) => setFirstComment(e.target.value)}
                        className="w-full text-sm sm:text-base border-0 p-2 focus:outline-none placeholder-gray-400 text-gray-900 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview - Shown when toggled on mobile */}
              <div
                className={`${showPreview ? "block lg:hidden" : "hidden"} h-full`}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Facebook Preview
                    </h3>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-center w-full">
                    <div className="w-full h-72 bg-white rounded-xl shadow-lg mb-4 flex items-center justify-center p-6">
                      <div className="w-full">
                        <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-4"></div>
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

            {/* Footer - Sticky on mobile, better button layout */}
            <div className="sticky bottom-0 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 bg-white">
              {/* Create Another - Full width on mobile */}
              <label className="flex items-center gap-2.5 cursor-pointer group mb-3 sm:mb-0">
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

              {/* Action Buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                  Save Drafts
                </button>

                <button
                  onClick={() => dispatch(ToggleCalender(true))}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />

                  {/* SCHEDULED TIME - Different display based on mode */}
                  {schedulePostData?.scheduledAt ? (
                    <span className="text-xs sm:text-sm">
                      {scheduleDate} • {scheduleTime}
                    </span>
                  ) : completeDateAndTime && !isEditMode ? (
                    <span className="text-xs sm:text-sm">
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
                    <span className="text-xs sm:text-sm">Schedule a post</span>
                  )}

                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  // onClick={() => HandleSetSchedule()}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  {isEditMode ? (
                    <div onClick={() => handleScheduleEditPostAgainSchedule()}>
                      Schedule Edit Post
                    </div>
                  ) : (
                    <div onClick={() => HandleSetSchedule()}>
                      Schedule Posts
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Preview (Desktop only) */}
          <div className="hidden lg:flex w-96 border-l border-gray-200 flex-col overflow-auto">
            <div className="p-5 border-b border-gray-200 bg-white flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-base">
                Facebook Preview
              </h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center w-full max-w-sm">
                <div className="w-full h-72 bg-white rounded-xl shadow-lg mb-4 mx-auto flex items-center justify-center p-6">
                  <div className="w-full">
                    <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-4"></div>
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

      {/* CALENDAR MODAL - Better mobile sizing */}
      {isCalenderOpen && (
        <>
          <div
            className="fixed inset-0 z-60 bg-black/30 backdrop-blur-sm"
            onClick={() => dispatch(ToggleCalender(false))}
          />
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 overflow-auto">
            <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-5 relative w-fit max-w-full max-h-full">
              {/* Close Button */}
              <button
                onClick={() => dispatch(ToggleCalender(false))}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-md transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              {/* Calendar Component */}
              <div className="overflow-auto">
                <DateAndMonthCalender />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
