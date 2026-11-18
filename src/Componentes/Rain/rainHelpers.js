import { dateSubtitle } from "../Forecast/dateForTable";

export const presets = [
  { label: "24h", hours: 24 },
  { label: "48h", hours: 48 },
  { label: "7 dias", hours: 24 * 7 },
];

export function formatMm(value) {
  if (value === null || value === undefined) return "--";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: value > 0 && value < 10 ? 1 : 0,
    maximumFractionDigits: 1,
  });
}

export function formatProbability(value) {
  if (value === null || value === undefined) return "--";
  return `${Math.round(value)}%`;
}

export function hoursOfForecast(hours, stepHours) {
  if (!hours?.length) return 0;
  return (hours[hours.length - 1].dt - hours[0].dt) / 3600 + stepHours;
}

// lista de botões de período, sem repetir períodos maiores que a previsão
export function presetsOfForecast(hours, stepHours) {
  const total = hoursOfForecast(hours, stepHours);
  const list = presets.filter((p) => p.hours < total);
  list.push({ label: `${Math.ceil(total / 24)} dias`, hours: total });
  return list;
}

export function rangeOfPreset(hours, presetHours) {
  const limit = hours[0].dt + presetHours * 3600;
  let endIndex = 0;

  for (let i = 0; i < hours.length; i++) {
    if (hours[i].dt < limit) endIndex = i;
  }

  return { startIndex: 0, endIndex };
}

export function summaryOfRain(hours) {
  let maxProbability = null;
  let wettest = null;
  let total = 0;

  hours.forEach((h) => {
    if (
      h.probability !== null &&
      (!maxProbability || h.probability > maxProbability.probability)
    ) {
      maxProbability = h;
    }
    if (h.mm !== null) {
      total = total + h.mm;
      if (!wettest || h.mm > wettest.mm) wettest = h;
    }
  });

  return { maxProbability, wettest, total: Math.round(total * 10) / 10 };
}

// eixo dos milímetros com números redondos: 0, metade e o máximo
export function axisOfMm(hours) {
  const max = Math.max(0, ...hours.map((h) => h.mm ?? 0));

  let top = 1;
  if (max > 1) top = 2;
  if (max > 2) top = Math.ceil(max / 2) * 2;
  if (max > 10) top = Math.ceil(max / 10) * 10;

  return { top, ticks: [0, top / 2, top] };
}

export function formatAxis(value) {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

// marcações do eixo X: de 3 em 3 horas até dias inteiros, conforme o período
function stepOfTicks(hours) {
  const span = hoursOfForecast(hours, 0);
  if (span <= 30) return 3;
  if (span <= 60) return 6;
  if (span <= 24 * 8) return 24;
  return 48;
}

function localHour(dt, timezone) {
  return new Date((dt + (timezone || 0)) * 1000).getUTCHours();
}

export function ticksOfWindow(hours, timezone) {
  const step = stepOfTicks(hours);
  const ticks = [];
  let lastGroup;

  hours.forEach((h) => {
    const group = Math.floor((h.dt + (timezone || 0)) / (step * 3600));
    if (group !== lastGroup) ticks.push(h.dt);
    lastGroup = group;
  });

  return { ticks, step };
}

export function tickLabel(dt, timezone, step) {
  const hour = localHour(dt, timezone);
  const day = dateSubtitle(dt, timezone).slice(0, 5);

  if (step >= 24 || hour < step) return day;
  return `${hour < 10 ? "0" + hour : hour}h`;
}
