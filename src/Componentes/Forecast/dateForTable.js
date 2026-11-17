const allDaysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

const pad = (n) => String(n).padStart(2, "0");

// A OpenWeatherMap manda `dt` em segundos UTC e `city.timezone` como o
// deslocamento da cidade em relação ao UTC (também em segundos). Somando os
// dois e lendo com getUTC* obtemos a data/hora local da cidade pesquisada,
// independente do fuso de quem está usando o site.
function cityDate(dt, timezone) {
  return new Date((dt + timezone) * 1000);
}

export function dayKey(dt, timezone) {
  const d = cityDate(dt, timezone);
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
}

export function dateSubtitle(dt, timezone) {
  const d = cityDate(dt, timezone);
  const dayOfWeek = allDaysOfWeek[d.getUTCDay()];

  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)} (${dayOfWeek})`;
}

export function dateAndHour(dt, timezone) {
  const d = cityDate(dt, timezone);
  return `${dateSubtitle(dt, timezone)} às ${pad(d.getUTCHours())}h`;
}
