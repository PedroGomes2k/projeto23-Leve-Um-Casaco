import styled from "styled-components";
import Informations from "./Informations.jsx";
import TableOfTime from "./TableOfTime.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Forecast({ forecast, tableForecast }) {
  function verifyIfUseCoat(tempActual) {
    if (tempActual <= 17) return "Você deve levar um casaquinho 🧥!";
    if (tempActual > 17) return "Não, voce não deve levar o casaquinho";
  }

  return (
    <Container>
      <div className="menu">
        <div className="city">
          <h2 style={{ fontSize: "17px" }}>Previsão do tempo para...</h2>
          <h1 style={{ fontSize: "50px" }}>{forecast?.name}</h1>
          <div className="latlong">
            <h3 style={{ fontSize: "15px" }}>
              Latitude: {parseFloat(forecast?.coord.lat).toFixed(2)}°
            </h3>
            <h3 style={{ fontSize: "15px" }}>
              Longitude: {parseFloat(forecast?.coord.lon).toFixed(2)}°
            </h3>
          </div>
        </div>

        <Informations
          tempMin={forecast?.main.temp_min}
          tempMax={forecast?.main.temp_max}
          humidity={forecast?.main.humidity}
          wind={forecast?.wind.speed}
          coat={verifyIfUseCoat(forecast?.main.temp)}
        />

        <TableOfTime tableForecast={tableForecast} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 1258px;
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: #efefef;
  border: 1px solid #d8d8d8;

  .menu {
    margin-left: 30px;
  }

  .city {
    h1,
    h2,
    h3 {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }

    .latlong {
      display: flex;

      h3 {
        margin-right: 20px;
      }
    }
  }
`;
