export const combineDateAndTime = (dateISO, time) => {
  if (!dateISO || !time) return null; // Return null if invalid

  const date = new Date(dateISO);

  const timeParts = time
    .trim()
    .match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!timeParts) return date.toISOString();

  let hours = Number(timeParts[1]);
  const minutes = Number(timeParts[2]);
  const seconds = timeParts[3] ? Number(timeParts[3]) : 0;
  const ampm = timeParts[4];

  if (ampm) {
    if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
  }

  date.setHours(hours, minutes, seconds);
  return date.toISOString();
};
