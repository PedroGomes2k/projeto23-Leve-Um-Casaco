import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Weather from "./Componentes/Weather/index.jsx";
import Forecast from "./Componentes/Forecast/index.jsx";
import { ContexProvider } from "./Contex/Contex.jsx";
import { fetchCityWeather } from "./Componentes/Weather/findCity.js";
import { showRequestError } from "./erros/cantFindCity.js";
import GlobalStyle from "./style/GlobalStyle.js";

const INITIAL_CITY = "Manaus";

function App() {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const lastRequest = useRef(0);

  const searchCity = useCallback(async (city) => {
    const requestId = ++lastRequest.current;

    try {
      const data = await fetchCityWeather(city);
      // Ignora respostas antigas se o usuário já pediu outra cidade
      if (requestId !== lastRequest.current) return;

      setWeather(data.weather);
      setForecast(data.forecast);
    } catch (error) {
      if (requestId !== lastRequest.current) return;
      showRequestError(error);
    }
  }, []);

  useEffect(() => {
    searchCity(INITIAL_CITY);
  }, [searchCity]);

  return (
    <ContexProvider>
      <GlobalStyle />
      <Container>
        <Weather weather={weather} onSearch={searchCity} />
        <Forecast weather={weather} forecast={forecast} />
      </Container>
    </ContexProvider>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export default App;
