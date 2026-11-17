import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

// Usar `params` faz o axios codificar o nome da cidade na URL
// (acentos, espaços, "&", "#"...).
function get(path, city) {
  return api.get(path, {
    params: {
      q: city,
      units: "metric",
      appid: import.meta.env.VITE_API_KEY,
    },
  });
}

// Busca o tempo atual e a previsão juntos: se um falhar, o erro é tratado
// uma única vez por quem chamou.
export async function fetchCityWeather(city) {
  const [weather, forecast] = await Promise.all([
    get("/weather", city),
    get("/forecast", city),
  ]);

  return { weather: weather.data, forecast: forecast.data };
}
