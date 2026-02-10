"use client";

function PostExpandedView({ post, onClose }) {
  if (!post) return null;

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
      facebook: "bg-blue-50 text-blue-700 border-blue-200",
      instagram: "bg-pink-50 text-pink-700 border-pink-200",
      twitter: "bg-sky-50 text-sky-700 border-sky-200",
      linkedin: "bg-indigo-50 text-indigo-700 border-indigo-200",
      default: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return colors[platform?.toLowerCase()] || colors.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-700 border-blue-300",
      published: "bg-green-100 text-green-700 border-green-300",
      draft: "bg-gray-100 text-gray-700 border-gray-300",
      failed: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[status?.toLowerCase()] || colors.draft;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-blue-200 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-200 border border-blue-200"
        >
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Post Details
              </h2>
              <p className="text-gray-600 text-sm">ID: {post._id}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full border text-sm font-semibold uppercase ${getStatusColor(post.status)}`}
            >
              {post.status}
            </span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheduled Time */}
            <div className="flex flex-col gap-3 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
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
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  Scheduled Time
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-blue-900 text-lg font-medium">
                  {formatDate(post.scheduledAt)}
                </span>
              </div>
            </div>

            {/* Created Time */}
            <div className="flex flex-col gap-3 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
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
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  Created
                </span>
              </div>
              <span className="text-blue-900 text-lg font-medium">
                {formatDate(post.createdAt)}
              </span>
            </div>

            {/* Template ID */}
            <div className="flex flex-col gap-3 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  Template ID
                </span>
              </div>
              <span className="text-blue-900 text-sm font-mono bg-white px-3 py-2 rounded border border-blue-200">
                {post.postTemplateId}
              </span>
            </div>

            {/* User ID */}
            <div className="flex flex-col gap-3 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  User ID
                </span>
              </div>
              <span className="text-blue-900 text-sm font-mono bg-white px-3 py-2 rounded truncate border border-blue-200">
                {post.user_id}
              </span>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="mt-6 flex flex-col gap-4 p-5 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
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
              <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                Connected Accounts ({post.connectedAccountPageId?.length || 0})
              </span>
            </div>

            {post.connectedAccountPageId?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {post.connectedAccountPageId.map((acc) => (
                  <div
                    key={acc._id}
                    className={`flex flex-col gap-2 p-4 rounded-lg border ${getPlatformColor(
                      acc.platform,
                    )} transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold uppercase tracking-wide">
                        {acc.platform}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    </div>
                    <span className="text-sm font-medium">{acc.pageName}</span>
                    {acc.pageId && (
                      <span className="text-xs opacity-70 font-mono truncate">
                        ID: {acc.pageId}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 bg-white rounded-lg border border-dashed border-blue-300">
                <span className="text-gray-500 text-sm">
                  No accounts connected
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostExpandedView;
