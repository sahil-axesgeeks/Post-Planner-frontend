// "use client";

// import React, { use, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import CreatePostModelComponent from "./CreatePostModelComponent";

// // REDUX
// import { useDispatch, useSelector } from "react-redux";
// import { togglePage, togglePageEdit } from "@/redux/slices/OpenNdCloseSlice";
// import { ScheduleDate } from "@/redux/slices/SchdulePostTimeAndDate";

// import { FacebookAllScheduledPostsThunk } from "@/redux/thunks/facebookThunks/FacebookAllScheduledPostsListThunk";

// import { fetchSingleFacebookPostThunk } from "@/redux/thunks/facebookThunks/SingleFacebookPostContentThunk";
// // import EditPostContent from "../EditPostComponent/EditPostContent";
// import CreateEditPostComponent from "./CreatePostModelComponent";

// export default function PostCalendar() {
//   const dispatch = useDispatch();

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [scheduledPostData, setScheduledPostData] = useState(null);

//   const isOpen = useSelector((state) => state.OpenNdClose.isPageOpen);
//   const isPageOpenEdit = useSelector(
//     (state) => state.OpenNdClose.isPageOpenEdit,
//   );
//   const { user } = useSelector((state) => state.authSlice);
//   console.log(user);

//   // ALL SCHEDULED POSTS FETCHING ALL
//   const listScheduledPosts = useSelector(
//     (state) => state.facebookAllScheduledPosts.allScheduledPosts,
//   );

//   console.log(listScheduledPosts);
//   const formatDateKey = (date) =>
//     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//       2,
//       "0",
//     )}-${String(date.getDate()).padStart(2, "0")}`;

//   const getMonthDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - startDate.getDay());

//     const days = [];
//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       days.push(date);
//     }
//     return days;
//   };

//   const navigateMonth = (dir) => {
//     setCurrentDate((prev) => {
//       const d = new Date(prev);
//       d.setMonth(prev.getMonth() + dir);
//       return d;
//     });
//   };

//   const formatTime = (dateTime) =>
//     new Date(dateTime).toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//   const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth();

//   const schedulePostList = listScheduledPosts?.scheduledPosts || [];
//   // console.log(schedulePostList);
//   const postsByDate = Array.isArray(schedulePostList)
//     ? schedulePostList.reduce((acc, post) => {
//         if (!post?.scheduledAt) return acc;

//         const key = formatDateKey(new Date(post.scheduledAt));
//         acc[key] = acc[key] || [];
//         acc[key].push(post);
//         return acc;
//       }, {})
//     : {};

//   const monthDays = getMonthDays();
//   const today = new Date();

//   // DOING THIS FOR FETCHING THE SCHEDULDED POSTS OF THE PARTICULAR MONTH
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth(); // 0-based

//   const startOfMonth = new Date(year, month, 1, 0, 0, 0);
//   const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

//   const startUTC = startOfMonth.toISOString();
//   const endUTC = endOfMonth.toISOString();

//   const startEndDate = { startUTC, endUTC };
//   // CREATE POST HANDLER
//   const handleCreatePost = (selectedDate = new Date()) => {
//     dispatch(togglePage(true));
//     // dispatch(ScheduleDate(selectedDate.toISOString()));
//   };

//   // EDIT POST HANDLER
//   const handleEditPost = async (post) => {
//     try {
//       setScheduledPostData(post);
//       console.log(post, "THE POST GOING TO EDITING");
//       dispatch(fetchSingleFacebookPostThunk(post.postTemplateId));

//       dispatch(togglePageEdit(true));
//     } catch (error) {
//       console.error("Error fetching post:", error);
//     }
//   };

//   // CLOSE EDIT MODAL
//   const handleCloseEdit = () => {
//     dispatch(togglePageEdit(false));
//     setScheduledPostData(null);
//   };

//   // FOR FETCHING ALL-SCHEDULED-POSTS
//   useEffect(() => {
//     if (!startUTC || !endUTC) return;

//     dispatch(FacebookAllScheduledPostsThunk(startEndDate));
//   }, [startUTC, endUTC, dispatch]);

//   console.log();

//   const FacebookIcon = () => (
//     <svg
//       className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3"
//       viewBox="0 0 24 24"
//       fill="#1877F2"
//     >
//       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//     </svg>
//   );

//   const getStatusClasses = (status) => {
//     switch (status) {
//       case "published":
//         return "bg-green-100 border-green-400 hover:bg-green-200";
//       case "failed":
//         return "bg-red-100 border-red-400 hover:bg-red-200";
//       case "scheduled":
//       default:
//         return "bg-blue-100 border-blue-400 hover:bg-blue-200";
//     }
//   };

//   const FacebookIconNew = ({ color }) => (
//     <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill={color}>
//       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//     </svg>
//   );
//   const getIconColor = (status) => {
//     switch (status) {
//       case "published":
//         return "#16a34a"; // green
//       case "failed":
//         return "#dc2626"; // red
//       case "scheduled":
//       default:
//         return "#1877F2"; // facebook blue
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-50 flex flex-col">
//       {/* HEADER */}
//       <div className="bg-white border-b p-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <h2 className="text-xl font-bold">
//             {currentDate.toLocaleString("default", { month: "long" })}{" "}
//             {currentDate.getFullYear()}
//           </h2>

//           <button onClick={() => navigateMonth(-1)}>
//             <ChevronLeft />
//           </button>

//           <button onClick={() => navigateMonth(1)}>
//             <ChevronRight />
//           </button>
//         </div>

//         {/* SCHEDULE BUTTON */}
//         <button
//           onClick={() => handleCreatePost()}
//           className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={16} /> Schedule
//         </button>
//       </div>

//       {/* GRID */}
//       <div className="flex-1 p-4 grid grid-cols-7 gap-2">
//         {monthDays.map((date, idx) => {
//           const dateKey = formatDateKey(date);
//           const dayPosts = postsByDate[dateKey] || [];

//           const MAX_VISIBLE_POSTS = 6;
//           const visiblePosts = dayPosts.slice(0, MAX_VISIBLE_POSTS);
//           const extraCount = dayPosts.length - MAX_VISIBLE_POSTS;

//           const isToday = formatDateKey(date) === formatDateKey(today);
//           const isOtherMonth = !isCurrentMonth(date);

//           return (
//             <div
//               key={idx}
//               className={`border rounded p-2 min-h-[110px] flex flex-col ${
//                 isToday ? "border-blue-500 bg-blue-50" : "bg-white"
//               } ${isOtherMonth ? "opacity-40" : ""}`}
//             >
//               {/* DATE */}
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold">{date.getDate()}</span>

//                 <button onClick={() => handleCreatePost(date)}>
//                   <Plus size={14} />
//                 </button>
//               </div>

//               {/* POSTS */}
//               <div className="flex flex-wrap gap-1">
//                 {visiblePosts.map((post) => (
//                   <div
//                     key={post._id}
//                     title={`${formatTime(post.scheduledAt)} • ${post.status}`}
//                     onClick={() => handleEditPost(post)}
//                     className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition
//         ${getStatusClasses(post.status)}
//       `}
//                   >
//                     <FacebookIcon color={getIconColor(post.status)} />
//                   </div>
//                 ))}
//                 {extraCount > 0 && (
//                   <div className="w-full text-xs font-semibold text-gray-600">
//                     +{extraCount} more
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {isPageOpenEdit && scheduledPostData && (
//         <CreateEditPostComponent
//           data={scheduledPostData}
//           isEditMode={true}
//           onClose={handleCloseEdit}
//         />
//       )}

//       {/* CREATE MODAL */}
//       {isOpen && <CreateEditPostComponent isEditMode={false} />}
//     </div>
//   );
// }

// LAYOUT 2
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { togglePage, togglePageEdit } from "@/redux/slices/OpenNdCloseSlice";
import { FacebookAllScheduledPostsThunk } from "@/redux/thunks/facebookThunks/FacebookAllScheduledPostsListThunk";
import { fetchSingleFacebookPostThunk } from "@/redux/thunks/facebookThunks/SingleFacebookPostContentThunk";
import CreateEditPostComponent from "./CreatePostModelComponent";

export default function PostTimeGridCalendar() {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledPostData, setScheduledPostData] = useState(null);

  const isOpen = useSelector((state) => state.OpenNdClose.isPageOpen);
  const isPageOpenEdit = useSelector(
    (state) => state.OpenNdClose.isPageOpenEdit,
  );

  const listScheduledPosts = useSelector(
    (state) => state.facebookAllScheduledPosts.allScheduledPosts,
  );

  const schedulePostList = listScheduledPosts?.scheduledPosts || [];

  const startOfWeek = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay(); // 0–6, Sun–Sat
    d.setDate(d.getDate() - day); // start from Sunday
    d.setHours(0, 0, 0, 0);
    return d;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + idx);
      return d;
    });
  }, [startOfWeek]);

  const timeSlots = useMemo(() => {
    const startHour = 0; // 06:00
    const endHour = 23; // 23:00
    const slots = [];
    for (let h = startHour; h <= endHour; h++) {
      slots.push(h);
    }
    return slots;
  }, []);

  const formatTimeLabel = (hour) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:00 ${ampm}`;
  };

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const isSameHourSlot = (dateTime, dayDate, hour) => {
    const d = new Date(dateTime);
    return formatDateKey(d) === formatDateKey(dayDate) && d.getHours() === hour;
  };

  const handleCreatePost = (selectedDateTime) => {
    dispatch(togglePage(true));
  };

  const handleEditPost = async (post) => {
    try {
      setScheduledPostData(post);
      dispatch(fetchSingleFacebookPostThunk(post.postTemplateId));
      dispatch(togglePageEdit(true));
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCloseEdit = () => {
    dispatch(togglePageEdit(false));
    setScheduledPostData(null);
  };

  const navigateWeek = (dir) => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() + dir * 7);
      return d;
    });
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "published":
        return "border-emerald-200 bg-emerald-50 text-emerald-800";
      case "failed":
        return "border-rose-200 bg-rose-50 text-rose-800";
      case "scheduled":
      default:
        return "border-blue-200 bg-blue-50 text-blue-800";
    }
  };

  const FacebookIconNew = () => (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const startUTC = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate(),
    0,
    0,
    0,
  ).toISOString();

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  const endUTC = endOfWeek.toISOString();

  const startEndDate = { startUTC, endUTC };

  useEffect(() => {
    if (!startUTC || !endUTC) return;
    dispatch(FacebookAllScheduledPostsThunk(startEndDate));
  }, [startUTC, endUTC, dispatch]);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-sm font-bold text-slate-900 sm:text-lg">
            Week of{" "}
            {startOfWeek.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h2>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateWeek(-1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigateWeek(1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={() => handleCreatePost(new Date())}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4 sm:text-sm"
        >
          <Plus size={16} />
          <span>Schedule</span>
        </button>
      </div>

      {/* HEADER ROW: empty time column + days */}
      <div className="border-b border-slate-200 bg-white px-2 py-2 sm:px-4">
        <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] items-center text-[11px] font-semibold text-slate-700 sm:text-xs">
          <div className="text-center text-slate-800">Time</div>
          {weekDays.map((day) => {
            const isToday = formatDateKey(day) === formatDateKey(new Date());
            return (
              <div
                key={day.toISOString()}
                className={`flex flex-col items-center justify-center rounded-md px-1 py-1 ${
                  isToday ? "bg-blue-100" : ""
                }`}
              >
                <span className="text-[11px] uppercase tracking-wide text-slate-600">
                  {day.toLocaleDateString(undefined, { weekday: "short" })}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIME GRID */}
      <div className="flex-1 overflow-auto bg-slate-50 px-2 py-2 sm:px-4 sm:py-3">
        <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] text-[11px] sm:text-xs">
          {timeSlots.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time label column */}
              <div className="border-b border-slate-100 bg-slate-50/90 py-4 pr-2 text-right text-[10px] font-semibold text-slate-700 sm:text-[11px]">
                <div className="inline-flex flex-col items-end gap-0.5">
                  <span>{formatTimeLabel(hour)}</span>
                  <span className="h-px w-6 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* 7 day columns */}
              {weekDays.map((day) => {
                const slotPosts = schedulePostList.filter((post) =>
                  isSameHourSlot(post.scheduledAt, day, hour),
                );

                const isToday =
                  formatDateKey(day) === formatDateKey(new Date());

                return (
                  <div
                    key={day.toISOString() + hour}
                    className={`
                      relative border-b border-l border-slate-100 px-1.5 py-2 align-top
                      transition-colors
                      ${isToday ? "bg-blue-50" : "bg-white hover:bg-slate-50"}
                    `}
                  >
                    <div className="flex min-h-[56px] flex-col gap-1.5">
                      {slotPosts.map((post) => (
                        <button
                          key={post._id}
                          type="button"
                          title={post.status}
                          onClick={() => handleEditPost(post)}
                          className={`
                            group flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-[11px]
                            font-medium text-slate-900
                            shadow-sm transition-all duration-150
                            hover:-translate-y-0.5 hover:shadow-md
                            ${getStatusClasses(post.status)}
                          `}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                            <FacebookIconNew />
                          </span>
                          <div className="flex min-w-0 flex-col">
                            <span className="line-clamp-1 text-left">
                              {post.caption || "Scheduled post"}
                            </span>
                            <span className="text-[9px] font-medium text-slate-700">
                              {new Date(post.scheduledAt).toLocaleTimeString(
                                undefined,
                                { hour: "numeric", minute: "2-digit" },
                              )}
                            </span>
                          </div>
                          <span className="ml-auto rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-800">
                            {post.status}
                          </span>
                        </button>
                      ))}

                      {slotPosts.length === 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const d = new Date(day);
                            d.setHours(hour, 0, 0, 0);
                            handleCreatePost(d);
                          }}
                          className="h-7 w-full rounded-md border border-dashed border-slate-300 text-[10px] font-medium text-slate-400 opacity-0 transition-all hover:border-slate-400 hover:text-slate-700 hover:opacity-100"
                        >
                          + Add post
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {isPageOpenEdit && scheduledPostData && (
        <CreateEditPostComponent
          data={scheduledPostData}
          isEditMode={true}
          onClose={handleCloseEdit}
        />
      )}
      {isOpen && <CreateEditPostComponent isEditMode={false} />}
    </div>
  );
}
