"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setInitialized } from "@/redux/slices/authSlice";
function PostSchedulerProfile({ stats }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });
        const data = await res.json();
        // console.log("NOW DISPATCHING THE USER");

        dispatch(setUser(data?.user));
      } catch (err) {
        // console.log("NOW DISPATCHING THE USER AS NUL");
        dispatch(setUser(null));
      } finally {
        dispatch(setInitialized(true));
      }
    };

    fetchUser();
  }, []);

  // SELECTORS
  const listScheduledPosts = useSelector(
    (state) => state.facebookAllScheduledPosts.allScheduledPosts,
  );
  const totalScheduledPosts = listScheduledPosts?.scheduledPosts?.length;
  const fetchPagesList = useSelector((state) => state.fetchPages.pages);
  console.log(fetchPagesList);

  const totalPagesList =
    fetchPagesList.data.length + fetchPagesList.instagramPages.length;

  console.log(totalPagesList);

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 bg-white rounded-2xl    overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold border-4 border-blue-100 flex-shrink-0">
            {user?.userName?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* User Info */}
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 truncate">
              {user?.userName || "User Name"}
            </h2>
            <p className="text-blue-600 text-xs sm:text-sm truncate">
              {user?.email || "user@example.com"}
            </p>

            {/* FETCH THE USER PLAN HERE ---> EDIT IN THE MODEL */}
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200 font-medium">
                Pro Plan
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-all duration-200 border border-blue-200 flex-shrink-0"
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Profile
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-4 sm:mb-6"></div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Total Posts */}
        <div className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">
            {totalScheduledPosts || 0}
          </h3>
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
            Total Posts
          </p>
        </div>

        {/* Scheduled Posts */}
        <div className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">
            {stats?.scheduledPosts || 0}
          </h3>
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
            Scheduled
          </p>
        </div>

        {/* Published Posts */}
        <div className="p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-1">
            {stats?.publishedPosts || 0}
          </h3>
          <p className="text-green-600 text-xs font-semibold uppercase tracking-wider">
            Published
          </p>
        </div>

        {/* Connected Accounts */}
        <div className="p-3 sm:p-4 bg-indigo-50 rounded-xl border border-indigo-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-1">
            {totalPagesList || 0}
          </h3>
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wider">
            Accounts
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-4 sm:mb-6"></div>

      {/* Connected Platforms */}
      <div className="mb-4 sm:mb-6 flex-grow">
        <h3 className="text-blue-900 font-bold text-base sm:text-lg mb-3 sm:mb-4">
          Connected Platforms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* Facebook */}
          {fetchPagesList.data.map((page) => {
            return (
              <>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-900 font-semibold text-xs sm:text-sm truncate">
                      Facebook
                    </p>
                    {/* <p className="text-blue-600 text-xs">Connected</p> */}
                    <p className="text-blue-600 text-xs">{page.pageName}</p>
                  </div>
                </div>
              </>
            );
          })}
          {/* Instagram */}
          {fetchPagesList?.instagramPages.map((page) => {
            return (
              <>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-pink-50 rounded-lg border border-pink-200 hover:bg-pink-100 transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-pink-900 font-semibold text-xs sm:text-sm truncate">
                      Instagram
                    </p>
                    {/* <p className="text-pink-600 text-xs">Connected</p> */}
                    <p className="text-pink-600 text-xs"> {page.pageName}</p>
                  </div>
                </div>
              </>
            );
          })}

          {/* Twitter */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-sky-50 rounded-lg border border-sky-200 hover:bg-sky-100 transition-all">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-sky-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sky-900 font-semibold text-xs sm:text-sm truncate">
                Twitter
              </p>
              <p className="text-sky-600 text-xs">Connected</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-all">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-indigo-900 font-semibold text-xs sm:text-sm truncate">
                LinkedIn
              </p>
              <p className="text-indigo-600 text-xs">Connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-auto">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Post
        </button>

        <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-all duration-200 border border-blue-200 flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          View Calendar
        </button>

        <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-all duration-200 border border-blue-200 flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Analytics
        </button>
      </div>
    </div>
  );
}

export default PostSchedulerProfile;
