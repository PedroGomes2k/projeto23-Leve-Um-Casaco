import { useContext } from "react";
import styled from "styled-components";
import Informations from "./Informations.jsx";
import TableOfTime from "./TableOfTime.jsx";
import { Context } from "../../Contex/Contex.jsx";
import { forecastShape, weatherShape } from "../shapes.js";
import { formatNumber } from "../../utils/format.js";

function verifyIfUseCoat(tempActual) {
  if (!Number.isFinite(tempActual)) return "";
  if (tempActual <= 17) return "Você deve levar um casaquinho 🧥!";
  return "Não, você não deve levar o casaquinho.";
}

export default function Forecast({ weather, forecast }) {
  const { changeColor, setChangeColor } = useContext(Context);
  const isLight = changeColor === "light";

  function changeColorSite() {
    setChangeColor(isLight ? "dark" : "light");
  }

  return (
    <Container $status={changeColor}>
      <button
        type="button"
        className="toggle"
        onClick={changeColorSite}
        aria-label={isLight ? "Ativar modo escuro" : "Ativar modo claro"}
        title={isLight ? "Ativar modo escuro" : "Ativar modo claro"}
      >
        <ion-icon name={isLight ? "moon" : "sunny"}></ion-icon>
      </button>

      <div className="city">
        <h2>Previsão do tempo para...</h2>
        <h1>{weather?.name ?? "--"}</h1>
        <div className="latlong">
          <h3>
            Latitude:{" "}
            {formatNumber(weather?.coord?.lat, { digits: 2, suffix: "°" })}
          </h3>
          <h3>
            Longitude:{" "}
            {formatNumber(weather?.coord?.lon, { digits: 2, suffix: "°" })}
          </h3>
        </div>
      </div>

      <Informations
        tempMin={weather?.main?.temp_min}
        tempMax={weather?.main?.temp_max}
        humidity={weather?.main?.humidity}
        wind={weather?.wind?.speed}
        coat={verifyIfUseCoat(weather?.main?.temp)}
      />

      <TableOfTime forecast={forecast} />
    </Container>
  );
}

Forecast.propTypes = {
  weather: weatherShape,
  forecast: forecastShape,
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  padding: 0px 30px 40px;

  background-color: ${(props) =>
    props.$status === "light" ? "#efefef" : "#070908"};
  transition: background-color 0.3s;

  .toggle {
    position: absolute;
    top: 30px;
    right: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 35px;

    background-color: ${(props) =>
      props.$status === "light" ? "#000000" : "#ededfedf"};

    border-radius: 15px;
    border: 1px solid
      ${(props) => (props.$status === "light" ? "#000000" : "#ededfedf")};
    box-shadow: 0px 1px 2px 0px;

    cursor: pointer;
  }

  ion-icon {
    width: 20px;
    height: 20px;

    color: ${(props) => (props.$status === "light" ? "#efefef" : "#000000e8")};
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
      color: ${(props) => (props.$status === "light" ? "#000000" : "#FFFFFF")};
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
    padding: 0px 16px 40px;

    .toggle {
      right: 16px;
    }

    .city {
      h1 {
        font-size: 36px;
      }
    }
  }
`;
