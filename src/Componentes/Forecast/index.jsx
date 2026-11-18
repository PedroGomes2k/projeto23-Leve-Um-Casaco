import styled from "styled-components";
import Informations from "./Informations.jsx";
import TableOfTime from "./TableOfTime.jsx";
import { useContext } from "react";
import { Context } from "../../Contex/Contex.jsx";

export default function Forecast({ forecast, tableForecast }) {
  const { changeColor, setChangeColor } = useContext(Context);

  function verifyIfUseCoat(tempActual) {
    if (tempActual === undefined) return "";
    if (tempActual <= 17) return "Você deve levar um casaquinho 🧥!";
    if (tempActual > 17) return "Não, você não deve levar o casaquinho.";
  }

  function changeColorSite() {
    if (changeColor === "dark") return setChangeColor("light");
    if (changeColor === "light") return setChangeColor("dark");
  }

  function iconOfButton() {
    if (changeColor === "dark") return "sunny";
    if (changeColor === "light") return "moon";
  }

  return (
    <Container $status={changeColor}>
      <button
        className="theme"
        onClick={() => changeColorSite()}
        aria-label="Trocar o tema"
      >
        <ion-icon name={iconOfButton()}></ion-icon>
      </button>
      <div className="menu">
        <div className="city">
          <h2>Previsão do tempo para...</h2>
          <h1>{forecast ? forecast.name : "--"}</h1>
          <div className="latlong">
            <h3>
              Latitude: {forecast ? forecast.coord.lat.toFixed(2) : "--"}°
            </h3>
            <h3>
              Longitude: {forecast ? forecast.coord.lon.toFixed(2) : "--"}°
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

        <TableOfTime
          tableForecast={tableForecast}
          timezone={forecast?.timezone}
          weather={forecast}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;

  background-color: ${(props) =>
    props.$status === "light" ? "#efefef" : "#0f172a"};

  .theme {
    width: 80px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) =>
      props.$status === "light" ? "#000000" : "#334155"};

    border-radius: 15px;
    border: 1px solid
      ${(props) => (props.$status === "light" ? "#000000" : "#475569")};
    box-shadow: 0px 1px 2px 0px;

    position: absolute;
    right: 30px;
    top: 30px;

    cursor: pointer;
  }

  .theme ion-icon {
    width: 20px;
    height: 20px;

    color: ${(props) => (props.$status === "light" ? "#efefef" : "#fbbf24")};
  }

  .menu {
    padding: 0px 30px 40px;
  }

  .city {
    padding-right: 100px;

    h1,
    h2,
    h3 {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};
    }

    h1 {
      font-size: 50px;
    }

    h2 {
      font-size: 17px;
    }

    h3 {
      font-size: 15px;
    }

    .latlong {
      display: flex;
      flex-wrap: wrap;

      h3 {
        margin-right: 20px;
      }
    }
  }

  @media (max-width: 480px) {
    .menu {
      padding: 0px 16px 40px;
    }

    .theme {
      right: 16px;
    }

    .city h1 {
      font-size: 36px;
    }
  }
`;
