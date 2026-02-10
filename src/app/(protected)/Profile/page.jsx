"use client";

import PostSchedulerProfile from "@/Actual-Components/profile/profile";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/Profile")} className="cursor-pointer">
      <PostSchedulerProfile></PostSchedulerProfile>
    </div>
  );
}
