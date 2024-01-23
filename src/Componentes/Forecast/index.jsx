import styled from "styled-components";
import Informations from "./Informations.jsx";
import TableOfTime from "./TableOfTime.jsx";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Contex/Contex.jsx";

export default function Forecast({ forecast, tableForecast }) {
  const { changeColor, setChangeColor } = useContext(Context);

  function verifyIfUseCoat(tempActual) {
    if (tempActual <= 17) return "Você deve levar um casaquinho 🧥!";
    if (tempActual > 17) return "Não, voce não deve levar o casaquinho";
  }

  function changeColorSite() {
    if (changeColor === "dark") return setChangeColor("light");
    if (changeColor === "light") return setChangeColor("dark");
  }

  return (
    <Container status={changeColor}>
      <button onClick={() => changeColorSite()}>
        {" "}
        <ion-icon name="sunny"></ion-icon>{" "}
      </button>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.status === "light" ? "#efefef" : "#070908"};
  border: 1px solid
    ${(props) => (props.status === "light" ? "#efefef" : "#070908")};

  button {
    width: 80px;
    height: 35px;

    background-color: ${(props) =>
      props.status === "light" ? "#000000" : "#ededfedf"};

    border-radius: 15px;
    border: 1px solid
      ${(props) => (props.status === "light" ? "#000000" : "#ededfedf")};
    box-shadow: 0px 1px 2px 0px;

    position: absolute;
    left: 90%;
    top: 30px;
  }

  ion-icon {
    
    width: 20px;
    height: 20px;

    color: ${(props) => (props.status === "light" ? "#efefef" : "#000000e8")};
  }

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
      color:  ${(props) => (props.status === "light" ? "#000000" : "#FFFFFF")};
    }

    .latlong {
      display: flex;

      h3 {
        margin-right: 20px;
      }
    }
  }
`;
