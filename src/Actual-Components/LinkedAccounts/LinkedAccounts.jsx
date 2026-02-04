"use client";

import { Facebook, Linkedin, Instagram, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FetchPagesThunk } from "@/redux/thunks/facebookThunks/fetchPagesThunk";
import { useMemo } from "react";
export default function LinkedAccounts() {
  const dispatch = useDispatch();

  // Redux state
  const fetchPagesList = useSelector((state) => state.fetchPages.pages);
  const loading = useSelector((state) => state.fetchPages.loading);
  const error = useSelector((state) => state.fetchPages.error);

  // console.log(fetchPagesList, "THE FETHCED PAGES LIST👑👑👑");

  // Fetch pages on mount
  useEffect(() => {
    dispatch(FetchPagesThunk());
  }, [dispatch]);

  // Map API data safely

  const mappedPages = useMemo(() => {
    return (
      fetchPagesList?.data?.map((page) => ({
        id: page.pageId,
        pageName: page.pageName,
        icon: Facebook,
        color: "bg-blue-50 hover:bg-blue-100",
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
        connected: true,
      })) || []
    );
  }, [fetchPagesList?.data]);

  const instagramMappedPages = useMemo(() => {
    return (
      fetchPagesList?.instagramPages?.map((page) => ({
        id: page.pageId,
        pageName: page.pageName,
        icon: Instagram,
        color: "bg-pink-50 hover:bg-pink-100",
        iconColor: "text-pink-600",
        borderColor: "border-pink-200",
        connected: true,
      })) || []
    );
  }, [fetchPagesList?.instagramPages]);

  // Loading state
  if (loading) {
    return <div>Loading linked pages...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Empty state
  if (mappedPages.length === 0) {
    return <div>No connected pages found.</div>;
  }

  // Render pages
  return (
    <>
      <div className="flex flex-col gap-2">
        {mappedPages.map((item) => (
          <div
            key={item.id}
            className={`group relative flex items-center gap-3 p-3 rounded-lg border ${item.borderColor} ${item.color} transition-all duration-200 cursor-pointer`}
          >
            {/* Icon */}
            <div className={`flex shrink-0 ${item.iconColor}`}>
              <item.icon size={20} strokeWidth={2} />
            </div>

            {/* Page name */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-800 capitalize truncate">
                {item.pageName}
              </div>
            </div>

            {/* Connected indicator */}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {instagramMappedPages.map((item) => (
          <div
            key={item.id}
            className={`group relative flex items-center gap-3 p-3 my-2 rounded-lg border ${item.borderColor} ${item.color} transition-all duration-200 cursor-pointer`}
          >
            {/* Icon */}
            <div className={`flex shrink-0 ${item.iconColor}`}>
              <item.icon size={20} strokeWidth={2} />
            </div>

            {/* Page name */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-800 capitalize truncate">
                {item.pageName}
              </div>
            </div>

            {/* Connected indicator */}
          </div>
        ))}
      </div>
    </>
  );
}
