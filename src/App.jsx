import { useState, useEffect } from "react";
import styled from "styled-components";
import Weather from "./Componentes/Weather/index.jsx";
import Forecast from "./Componentes/Forecast/index.jsx";
import { ContexProvider } from "./Contex/Contex.jsx";
import { getWeatherAndForecast } from "./Componentes/Weather/findCity.js";

function App() {
  const [weatherCity, setWeatherCity] = useState();
  const [tableForecast, setTableForecast] = useState();

  useEffect(() => {
    getWeatherAndForecast("manaus", setWeatherCity, setTableForecast);
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
  width: 100%;
  min-height: 100vh;

  display: flex;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export default App;
