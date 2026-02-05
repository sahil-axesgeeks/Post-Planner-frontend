// import { useCallback } from "react";

// const useFormChange = (setForm) => {
//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       setForm((prev) => ({ ...prev, [name]: value }));
//     },
//     [setForm],
//   );

//   return handleChange;
// };

// export default useFormChange;

"use client";
import { useCallback, useEffect } from "react";

const useFormChange = (setForm) => {
  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [setForm],
  );

  // Detect locale & timezone once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const locale = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setForm((prev) => ({
      ...prev,
      locale,
      timezone,
      timeFormat: locale === "en-US" ? "12h" : "24h",
    }));
  }, [setForm]);

  return handleChange;
};

export default useFormChange;
