"use client";

import { useState } from "react";

function PostData({
  post,
  onExpand,
  isPageOpenEdit,
  scheduledPostData,
  handleEditPost,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(post);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: "bg-blue-100 text-blue-700 border-blue-300",
      instagram: "bg-pink-100 text-pink-700 border-pink-300",
      twitter: "bg-sky-100 text-sky-700 border-sky-300",
      linkedin: "bg-indigo-100 text-indigo-700 border-indigo-300",
      default: "bg-blue-100 text-blue-700 border-blue-300",
    };
    return colors[platform?.toLowerCase()] || colors.default;
  };

  return (
    <div
      className={`flex flex-col gap-4 p-4 bg-white rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 ${
        isExpanded ? "w-full max-w-4xl" : "w-full max-w-md"
      }`}
    >
      <div className="flex  justify-between">
        <button
          onClick={() => handleEditPost(post)}
          className="self-end flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs rounded-lg transition-all duration-200 border border-blue-200"
        >
          Edit
        </button>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => onExpand(post)}
          className="self-end flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs rounded-lg transition-all duration-200 border border-blue-200"
        >
          {isExpanded ? (
            <>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          ) : (
            <>
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
          Scheduled Time
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-blue-900 text-sm font-medium">
            {formatDate(post.scheduledAt)}
          </span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="flex flex-col gap-2">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
          Created
        </span>
        <span className="text-blue-900 text-sm">
          {formatDate(post.createdAt)}
        </span>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="flex flex-col gap-3">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
          Connected Accounts ({post.connectedAccountPageId?.length || 0})
        </span>
        {post.connectedAccountPageId?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.connectedAccountPageId.map((acc) => (
              <div
                key={acc._id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getPlatformColor(
                  acc.platform,
                )} transition-all hover:scale-105`}
              >
                <span className="text-xs font-medium">{acc.pageName}</span>
                <span className="text-xs opacity-70">•</span>
                <span className="text-xs font-semibold uppercase">
                  {acc.platform}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 px-4 bg-blue-50 rounded-lg border border-dashed border-blue-200">
            <span className="text-gray-500 text-sm">No accounts connected</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostData;
