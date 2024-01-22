import axios from "axios";

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
    .catch(() =>
      Swal.fire({
        title: "Erro!",
        text: "Cidade não encontrada. Por favor tente outra cidade !",
        confirmButtonText: "Ok",
        customClass: {
          container: "custom-swal-container",
          popup: "custom-swal-popup",
          content: "custom-swal-content",
        },
      })
    );
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
    .catch(() =>
      Swal.fire({
        title: "Erro!",
        text: "Cidade não encontrada. Por favor tente outra cidade !",
        confirmButtonText: "Ok",
        customClass: {
          container: "custom-swal-container",
          popup: "custom-swal-popup",
          content: "custom-swal-content",
        },
      })
    );
}
