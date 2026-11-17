import { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import coat from "../../assets/coat.png";
import { dateAtcual } from "./dateComplete.js";
import climateOfWeather from "./climateOfWeather.js";
import CitiesExemple from "./CitiesExemple.jsx";
import { Context } from "../../Contex/Contex.jsx";
import { weatherShape } from "../shapes.js";
import { formatTemp } from "../../utils/format.js";

export default function Weather({ weather, onSearch }) {
  const date = dateAtcual();
  const [searchCity, setSearchCity] = useState("");
  const { changeColor } = useContext(Context);

  const infomationWeather = climateOfWeather(weather?.weather?.[0]?.main);

  function search(e) {
    e.preventDefault();

    const city = searchCity.trim();
    if (!city) return;

    onSearch(city);
    setSearchCity("");
  }

  return (
    <Container $status={changeColor}>
      <div className="title">
        <img src={coat} alt="Casaco azul" />
        <h1>Levo um casaquinho?</h1>
      </div>

      <CitiesExemple onSelectCity={onSearch} />

      <form onSubmit={search}>
        <input
          type="text"
          placeholder="  🔍  Procure por uma cidade"
          aria-label="Procure por uma cidade"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </form>

      <div className="temperature">
        <ion-icon
          name="ellipse"
          style={{ color: infomationWeather.color }}
        ></ion-icon>
        <h1 style={{ color: infomationWeather.color }}>
          {formatTemp(weather?.main?.temp)}
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

Weather.propTypes = {
  weather: weatherShape,
  onSearch: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 608px;
  padding-bottom: 40px;

  background-color: ${(props) =>
    props.$status === "light" ? "#FFFFFF" : "#16161a"};
  color: ${(props) => (props.$status === "light" ? "#000000" : "#FFFFFF")};
  transition: background-color 0.3s, color 0.3s;

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

    background: ${(props) => (props.$status === "light" ? "#ededef" : "#2a2a31")};
    color: ${(props) => (props.$status === "light" ? "#000000" : "#FFFFFF")};

    border: 1px solid
      ${(props) => (props.$status === "light" ? "#ededef" : "#2a2a31")};
    border-radius: 24px;
    box-shadow: 0px 24px 48px 0px #314f7c14;

    &::placeholder {
      color: ${(props) => (props.$status === "light" ? "#757575" : "#a0a0aa")};
    }

    &:focus {
      outline: none;
      box-shadow: 0px 24px 48px 0px #314f7c14;
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
      ${(props) => (props.$status === "light" ? "#ededed" : "#2e2e35")};
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
