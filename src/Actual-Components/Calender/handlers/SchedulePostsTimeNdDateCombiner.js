export const combineDateAndTime = (dateISO, time) => {
  const date = new Date(dateISO);

  const [hours, minutes, seconds] = time.split(":").map(Number);

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || 0);

  console.log(date, "THE DATE COMES AFTER THE COMBINATION");
  return date.toISOString();
};
