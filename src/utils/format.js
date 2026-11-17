// Formata números vindos da API. Enquanto os dados não chegam (ou se a
// requisição falhar) mostra "--" em vez de "NaN".
export function formatNumber(value, { digits = 0, suffix = "" } = {}) {
  const number = Number(value);
  if (value === null || value === undefined || !Number.isFinite(number)) {
    return `--${suffix}`;
  }
  const formatted = digits > 0 ? number.toFixed(digits) : Math.round(number);
  return `${formatted}${suffix}`;
}

export const formatTemp = (value) => formatNumber(value, { suffix: "°C" });
