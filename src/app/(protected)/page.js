"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Calendar from "@/app/(protected)/Calender/Calender";

import { useRouter } from "next/navigation";
// REDUCX
import { useDispatch } from "react-redux";
import { setUser, setInitialized } from "@/redux/slices/authSlice";
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, initialized, user } = useSelector(
    (state) => state.authSlice,
  );
  console.log(user, "THE USER FROM THE PROTECTED LAYOUT-->PAGE🦺");

  // fetching the user details from the server cookie
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

  // Show loader while hydrating
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen w-screen">
          <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 rounded-full" />
        </div>
        <div>PROTECTED-PAGE-LOADING</div>
      </>
    );
  }

  return (
    <main className="p-4">
      <Calendar />
    </main>
  );
}
