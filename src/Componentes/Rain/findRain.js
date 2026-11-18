import axios from "axios";

// A Open-Meteo é gratuita, não precisa de chave e entrega a previsão
// hora a hora para até 16 dias (o máximo que a API permite).
const DAYS_OF_FORECAST = 16;

export function getRainForecast(lat, lon) {
  return axios
    .get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: "precipitation_probability,precipitation",
        forecast_days: DAYS_OF_FORECAST,
        timezone: "auto",
        timeformat: "unixtime",
      },
    })
    .then((res) => {
      const { time, precipitation_probability, precipitation } =
        res.data.hourly;
      const now = Date.now() / 1000;
      const hours = [];

      for (let i = 0; i < time.length; i++) {
        // ignora as horas que já passaram
        if (time[i] + 3600 <= now) continue;

        hours.push({
          dt: time[i],
          probability: precipitation_probability[i] ?? null,
          mm: precipitation[i] ?? null,
        });
      }

      // remove o final da lista se a API não tiver dados para essas horas
      while (
        hours.length > 0 &&
        hours[hours.length - 1].probability === null &&
        hours[hours.length - 1].mm === null
      ) {
        hours.pop();
      }

      if (hours.length === 0) throw new Error("Sem dados de chuva");

      return {
        hours,
        timezone: res.data.utc_offset_seconds,
        stepHours: 1,
        source: "Open-Meteo",
      };
    });
}

// Plano B: usa a previsão de 3 em 3 horas que já veio do OpenWeatherMap.
export function rainFromOpenWeather(tableForecast, timezone) {
  const hours = tableForecast.map((item) => ({
    dt: item.dt,
    probability: Math.round((item.pop ?? 0) * 100),
    mm: item.rain?.["3h"] ?? 0,
  }));

  return { hours, timezone, stepHours: 3, source: "OpenWeatherMap" };
}
