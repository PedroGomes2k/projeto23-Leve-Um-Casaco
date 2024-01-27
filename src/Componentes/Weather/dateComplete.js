import { allDaysOfWeek } from "./daysWeek";

export function dateAtcual() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  const dateComplete = `${day} / ${month} / ${year}`;

  const dayOfWeek = allDaysOfWeek[date.getDay()];

  return { dateComplete, dayOfWeek };
}
