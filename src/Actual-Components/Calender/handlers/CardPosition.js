export const getTopPosition = (scheduledAt) => {
  const date = new Date(scheduledAt);

  if (isNaN(date)) return 0;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 100px per hour
  return hours * 100 + (minutes / 60) * 100;
};
