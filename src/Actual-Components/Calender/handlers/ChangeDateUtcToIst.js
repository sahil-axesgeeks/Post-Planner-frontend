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

export function formatTimeWithAmPm(time24) {
  if (!time24) return "";
  console.log(time24, "🥽🥽🥽🥽");

  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}
