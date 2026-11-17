import axios from "axios";
import { cantFindCity, cantLoadWeather } from "../../erros/cantFindCity";

let lastSearch = 0;

export function getWeatherAndForecast(
  searchCity,
  setWeather,
  setTableForecast,
  changeColor
) {
  const city = encodeURIComponent(searchCity);

  lastSearch = lastSearch + 1;
  const search = lastSearch;

  const weather = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  const forecast = axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  Promise.all([weather, forecast])
    .then(([resWeather, resForecast]) => {
      if (search !== lastSearch) return;

      setWeather(resWeather.data);
      setTableForecast(resForecast.data.list);
    })
    .catch((err) => {
      if (search !== lastSearch) return;
      if (err.response?.status === 404) return cantFindCity(changeColor);

      console.log(err);
      cantLoadWeather(changeColor);
    });
}
