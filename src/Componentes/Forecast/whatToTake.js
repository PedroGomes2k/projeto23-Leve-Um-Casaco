const RAIN = ["Rain", "Drizzle", "Thunderstorm"];

// Monta a lista do que levar de acordo com o tempo agora e nas próximas horas.
export function whatToTake(weather, tableForecast) {
  if (!weather) return [];

  const climate = weather.weather[0]?.main;
  const temp = weather.main.temp;
  const tips = [];

  const isSnow = climate === "Snow";
  const isDay = weather.sys
    ? weather.dt >= weather.sys.sunrise && weather.dt < weather.sys.sunset
    : true;
  const isSunny =
    climate === "Clear" ||
    (climate === "Clouds" && (weather.clouds?.all ?? 100) <= 25);

  // a previsão vem de 3 em 3 horas: 4 itens = próximas 12 horas
  const nextHours = tableForecast?.slice(0, 4) ?? [];
  const willRain = nextHours.some((f) => (f.pop ?? 0) >= 0.5);

  if (temp <= 17 || isSnow) {
    tips.push({ icon: "🧥", text: "Leve um casaquinho" });
  } else {
    tips.push({ icon: "👕", text: "Não precisa de casaquinho" });
  }

  if (isSnow || temp <= 5) {
    tips.push({ icon: "🧣", text: "Touca e luvas para o frio" });
  }

  if (RAIN.includes(climate)) {
    tips.push({ icon: "☂️", text: "Está chovendo, leve um guarda-chuva" });
  } else if (willRain) {
    tips.push({
      icon: "☂️",
      text: "Pode chover nas próximas horas, leve um guarda-chuva",
    });
  }

  if (isSunny && isDay) {
    tips.push({ icon: "🧴", text: "Sol aberto, passe protetor solar" });
  }

  return tips;
}
