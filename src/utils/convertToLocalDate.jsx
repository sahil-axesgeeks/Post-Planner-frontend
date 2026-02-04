export function toLocalDate(dateString) {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split("-").map(Number);
  // month is 0-based in JS Date
  return new Date(year, month - 1, day);
}
