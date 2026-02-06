"use client";

import { Facebook, Linkedin, Instagram, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { FetchPagesThunk } from "@/redux/thunks/facebookThunks/fetchPagesThunk";

export default function LinkedAccounts() {
  const dispatch = useDispatch();

  // Redux state
  const fetchPagesList = useSelector((state) => state.fetchPages.pages);
  const loading = useSelector((state) => state.fetchPages.loading);
  const error = useSelector((state) => state.fetchPages.error);

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
        color:
          "bg-blue-50/80 hover:bg-blue-100/90 dark:bg-blue-950/40 dark:hover:bg-blue-900/60",
        iconColor: "text-blue-600 dark:text-blue-300",
        borderColor: "border-blue-100 dark:border-blue-900/70",
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
        color:
          "bg-rose-50/80 hover:bg-rose-100/90 dark:bg-rose-950/40 dark:hover:bg-rose-900/60",
        iconColor: "text-rose-600 dark:text-rose-300",
        borderColor: "border-rose-100 dark:border-rose-900/70",
        connected: true,
      })) || []
    );
  }, [fetchPagesList?.instagramPages]);

  // Combine all pages
  const allPages = useMemo(() => {
    return [...mappedPages, ...instagramMappedPages];
  }, [mappedPages, instagramMappedPages]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center gap-2">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300/60 border-t-blue-500" />
          <p className="text-[11px] font-medium text-slate-500">
            Loading accounts...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50/70 px-3 py-3 text-center">
        <p className="text-xs font-medium text-red-600">{error}</p>
      </div>
    );
  }

  // Empty state
  if (allPages.length === 0) {
    return (
      <div className="px-3 py-6 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Instagram className="h-4 w-4 text-slate-400" strokeWidth={2} />
        </div>
        <p className="text-xs font-medium text-slate-500">
          No accounts connected yet
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Connect a channel to get started
        </p>
      </div>
    );
  }

  // Render pages

  return (
    <div className="flex flex-col items-center space-y-1.5">
      {allPages.map((item) => (
        <div
          key={item.id}
          className={`
          group relative flex items-center gap-2 rounded-xl border
          px-1.5 py-1.5 sm:px-2.5 sm:py-2
          text-[11px] sm:text-xs
          ${item.borderColor} ${item.color}
          shadow-sm shadow-slate-200/40 dark:shadow-black/30
          transition-all duration-200
          cursor-pointer
          hover:-translate-y-0.5 hover:shadow-md
          active:scale-[0.98]
          w-[2.5rem] sm:w-full
          justify-center sm:justify-start
        `}
        >
          {/* Icon pill – always centered in narrow/icon mode */}
          <div
            className={`
            flex shrink-0 items-center justify-center
            h-8 w-8 rounded-full bg-white/90 dark:bg-slate-900
            ring-2 ring-white/80 dark:ring-slate-700
            shadow-sm shadow-slate-300/80 dark:shadow-black/50
            ${item.iconColor}
            group-hover:scale-105
            transition-all duration-200
          `}
          >
            <item.icon className="h-4 w-4" strokeWidth={2} />
          </div>

          {/* Text only from sm: so icon-only feels like shadcn icon mode */}
          <div className="hidden min-w-0 flex-1 sm:block">
            <div className="truncate text-[11px] font-medium text-slate-700 dark:text-slate-100 sm:text-xs">
              {item.pageName}
            </div>
            <p className="mt-0.5 text-[10px] text-slate-400 group-hover:text-slate-500">
              Connected page
            </p>
          </div>

          <div className="hidden shrink-0 sm:flex">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-600 shadow-sm shadow-emerald-200/70 dark:border-emerald-500/60 dark:bg-emerald-900/40">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
