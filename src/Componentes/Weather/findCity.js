import axios from "axios";
import { cantFindCity } from "../../erros/cantFindCity";

export function getWather(searchCity, setWeather) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
    .then((res) => {
      setWeather(res.data);
    })
    .catch(() => cantFindCity());
}

export function getForeCast(searchCity, setTableForecast) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
    .then((res) => {
      setTableForecast(res.data.list);
    })
    .catch(() => cantFindCity());
}
