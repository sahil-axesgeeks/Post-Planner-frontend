"use client";
import Calendar from "@/app/(protected)/Calender/Calender";
import { DecodeCookieThunk } from "@/redux/thunks/auth/DecodeCookieThunk";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  // FETCHING THE USER DETAILS OVER HERE
  const { user } = useSelector((state) => {
    return state.authSlice;
  });

  console.log(user, "🦼🦼🦼");

  useEffect(() => {
    if (!user) dispatch(DecodeCookieThunk()); // fetch user if Redux is empty
  }, [user, dispatch]);
  return (
    <h2>
      <Calendar></Calendar>
    </h2>
  );
}
