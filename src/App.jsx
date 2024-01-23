import { useState, useEffect } from "react";
import styled from "styled-components";
import Weather from "./Componentes/Weather/index.jsx";
import Forecast from "./Componentes/Forecast/index.jsx";
import axios from "axios";
import { ContexProvider } from "./Contex/Contex.jsx";

function App() {
  const [weatherCity, setWeatherCity] = useState();
  const [tableForecast, setTableForecast] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=manaus&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        setWeatherCity(res.data);
      
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=manaus&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        setTableForecast(res.data.list);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContexProvider>
      <Container>
        <Weather
          weather={weatherCity}
          setWeather={setWeatherCity}
          setTableForecast={setTableForecast}
        />
        <Forecast forecast={weatherCity} tableForecast={tableForecast} />
      </Container>
    </ContexProvider>
  );
}

const Container = styled.div`
  width: 1920px;
  height: 800px;

  display: flex;
`;

export default App;
