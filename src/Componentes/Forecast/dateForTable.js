export function dateSubtitle(dt, timezone) {
  const objectDate = new Date((dt + (timezone || 0)) * 1000);

  let day = objectDate.getUTCDate();
  let month = objectDate.getUTCMonth() + 1;

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  const allDaysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const dayOfWeek = allDaysOfWeek[objectDate.getUTCDay()];

  const formatDate = `${day}/${month} (${dayOfWeek})`;

  return formatDate;
}

export function dateAndHour(dt, timezone) {
  const objectDate = new Date((dt + (timezone || 0)) * 1000);

  let hour = objectDate.getUTCHours();
  hour = hour < 10 ? "0" + hour : hour;

  const formatDate = `${dateSubtitle(dt, timezone)} às ${hour}h`;

  return formatDate;
}
