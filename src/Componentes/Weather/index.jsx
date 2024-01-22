import styled from "styled-components";
import coat from "../../assets/coat.png";
import { dateAtcual } from "./dateComplete.js";
import { useEffect, useState } from "react";
import axios from "axios";
import climateOfWeather from "./climateOfWeather.js";
import Swal from "sweetalert2";
import CitiesExemple from "./CitiesExemple.jsx";
import { getForeCast, getWather } from "./findCity.js";

export default function Weather({ weather, setWeather, setTableForecast }) {
  const date = dateAtcual();

  const [searchCity, setSearchCity] = useState({ city: "" });
  const [choseCity, setChoseCity] = useState();
  const infomationWeather = climateOfWeather(
    weather?.weather.map((w) => w.main)
  );

  function search(e) {
    e.preventDefault();

    getWather(searchCity.city || choseCity, setWeather);
    getForeCast(searchCity.city || choseCity, setTableForecast);
  }

  return (
    <Container>
      <div className="title">
        <img src={coat} alt="This is a photo of a coat" />
        <h1>Levo um casaquinho?</h1>
      </div>

      <CitiesExemple setChoseCity={setChoseCity} search={search} />

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
          {parseInt(weather?.main.temp)}°C
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

  width: 608px;
  height: 100%;

  background-color: #ffffff;
  border: 1px solid #d8d8d8;

  .title {
    display: flex;
    width: 416px;
    height: 96px;

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

  form,
  input {
    width: 350px;
    height: 50px;

    margin: 0px auto;

    background: #ededef;

    border: 1px solid #ededef;
    border-radius: 24px;
    box-shadow: 0px 24px 48px 0px #314f7c14;

    left: 152px;
  }

  .temperature {
    display: flex;
    flex-wrap: wrap;
    margin: 0px auto;
    margin-top: 70px;

    h1 {
      font-family: "Poppins", sans-serif;
      font-size: 80px;
      font-weight: 300;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin: 0px 15px;
    }
    ion-icon {
      width: 50px;
      height: 50px;
      margin-left: 100px;
    }

    h2 {
      width: 200px;
      margin: 35px auto;
      margin-top: 60px;

      font-family: Poppins;
      font-size: 32px;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .line {
    width: 70%;
    border: 3px solid #ededed;
    border-radius: 5px;

    margin: 0px auto;
  }

  .date {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 60px;
    margin-top: 50px;

    color: #222222;

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
`;
