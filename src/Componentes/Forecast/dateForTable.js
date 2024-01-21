export function dateSubtitle(date) {
  const objectDate = new Date(date);

  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  const allDaysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const dayOfWeek = allDaysOfWeek[objectDate.getDay()];

  const formatDate = `${day}/${month} (${dayOfWeek})`;
 
  return formatDate;
}
