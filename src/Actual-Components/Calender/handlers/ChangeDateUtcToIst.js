export const formatISTDateTime = (utcString) => {
  if (!utcString) return { date: "", time: "" };

  const d = new Date(utcString);

  // IST date
  const date = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  // IST time
  const time = d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  // console.log(date, time);
  return { date, time };
};
