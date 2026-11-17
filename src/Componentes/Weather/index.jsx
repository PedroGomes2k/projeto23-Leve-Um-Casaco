import styled from "styled-components";
import coat from "../../assets/coat.png";
import { dateAtcual } from "./dateComplete.js";
import { useContext, useState } from "react";
import climateOfWeather from "./climateOfWeather.js";
import CitiesExemple from "./CitiesExemple.jsx";
import { getWeatherAndForecast } from "./findCity.js";
import { Context } from "../../Contex/Contex.jsx";

export default function Weather({ weather, setWeather, setTableForecast }) {
  const date = dateAtcual();

  const [searchCity, setSearchCity] = useState({ city: "" });

  const { changeColor } = useContext(Context);
  const infomationWeather = climateOfWeather(
    weather?.weather.map((w) => w.main),
    changeColor
  );

  function findCity(city) {
    getWeatherAndForecast(city, setWeather, setTableForecast, changeColor);
  }

  function search(e) {
    e.preventDefault();

    if (searchCity.city.trim() === "") return;

    findCity(searchCity.city.trim());
    setSearchCity({ city: "" });
  }

  return (
    <Container $status={changeColor}>
      <div className="title">
        <img src={coat} alt="This is a photo of a coat blue" />
        <h1>Levo um casaquinho?</h1>
      </div>

      <CitiesExemple findCity={findCity} />

      <form onSubmit={search}>
        <input
          type="text"
          placeholder="  🔍  Procure por uma cidade"
          value={searchCity.city}
          onChange={(e) =>
            setSearchCity({ ...searchCity, city: e.target.value })
          }
        />
      </form>

      <div className="temperature">
        <ion-icon
          name="ellipse"
          style={{ color: infomationWeather.color }}
        ></ion-icon>
        <h1 style={{ color: infomationWeather.color }}>
          {weather ? Math.round(weather.main.temp) : "--"}°C
        </h1>
        <h2>{infomationWeather.textClimate}</h2>
      </div>

      <div className="line"></div>

      <div className="date">
        <h1>{date.dateComplete}</h1>
        <h2>{date.dayOfWeek}</h2>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 608px;
  padding-bottom: 40px;

  background-color: ${(props) =>
    props.$status === "light" ? "#FFFFFF" : "#1e293b"};
  color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

  .title {
    display: flex;
    width: 416px;
    max-width: calc(100% - 32px);
    min-height: 96px;

    margin: 60px auto;

    h1 {
      margin-left: 15px;

      font-family: "Poppins", sans-serif;
      font-size: 43px;
      font-weight: 600;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }

    img {
      width: 65px;
      height: 65px;

      margin-top: 15px;
      margin-left: 15px;
    }
  }

  form {
    width: 325px;
    max-width: calc(100% - 32px);

    margin: 0px auto;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 50px;

    padding-left: 25px;

    background: ${(props) =>
      props.$status === "light" ? "#ededef" : "#334155"};
    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

    border: 1px solid
      ${(props) => (props.$status === "light" ? "#ededef" : "#475569")};
    border-radius: 24px;
    box-shadow: 0px 24px 48px 0px
      ${(props) => (props.$status === "light" ? "#314f7c14" : "#00000059")};

    &::placeholder {
      color: ${(props) => (props.$status === "light" ? "#757575" : "#94a3b8")};
    }

    &:focus {
      outline: none;
      border-color: ${(props) =>
        props.$status === "light" ? "#4d4494" : "#818cf8"};
    }
  }

  .temperature {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 70px;

    h1 {
      font-family: "Poppins", sans-serif;
      font-size: 80px;
      font-weight: 300;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin: 0px 15px;
      margin-left: 30px;
    }

    ion-icon {
      width: 50px;
      height: 50px;
      margin-left: 20px;
    }

    h2 {
      width: 100%;
      min-height: 48px;
      margin-bottom: 35px;
      margin-top: 60px;

      font-family: "Poppins", sans-serif;
      font-size: 32px;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: center;
    }
  }

  .line {
    width: 70%;
    border: 2px solid
      ${(props) => (props.$status === "light" ? "#ededed" : "#334155")};
    border-radius: 8px;

    margin: 0px auto;
  }

  .date {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60px;
    margin-top: 50px;

    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: center;

    h2 {
      position: relative;
      bottom: 20px;
    }
  }

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    .title {
      margin: 40px auto;

      h1 {
        font-size: 32px;
        line-height: 38px;
      }
    }

    .temperature h1 {
      font-size: 64px;
    }
  }
`;
