// "use client";
// import Calendar from "@/app/(protected)/Calender/Calender";
// import { DecodeCookieThunk } from "@/redux/thunks/auth/DecodeCookieThunk";
// import { useSelector, useDispatch } from "react-redux";

// import { useEffect } from "react";

// export default function Home() {
//   const dispatch = useDispatch();
//   // FETCHING THE USER DETAILS OVER HERE
//   const { user } = useSelector((state) => {
//     return state.authSlice;
//   });

//   useEffect(() => {
//     if (!user) dispatch(DecodeCookieThunk()); // fetch user if Redux is empty
//   }, [user, dispatch]);
//   return (
//     <h2>
//       <Calendar></Calendar>
//     </h2>
//   );
// }

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Calendar from "@/app/(protected)/Calender/Calender";
import { DecodeCookieThunk } from "@/redux/thunks/auth/DecodeCookieThunk";

export default function Home() {
  const dispatch = useDispatch();

  //

  const { user, loading, error, initialized } = useSelector(
    (state) => state.authSlice,
  );

  useEffect(() => {
    if (!initialized) {
      dispatch(DecodeCookieThunk());
    }
  }, [initialized, dispatch]);

  if (loading || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Unauthorized</p>
      </div>
    );
  }

  return (
    <main className="p-4">
      <Calendar />
    </main>
  );
}
