export function getFutureDate(daysToAdd: number): {
  year: number;
  month: number;
  day: number;
} {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  return {
    year: date.getFullYear(),
    month: date.getMonth(), // 0-based
    day: date.getDate(),
  };
}
