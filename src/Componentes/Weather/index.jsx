import styled from "styled-components";
import coat from "../../assets/coat.png";
import { dateAtcual } from "./dateComplete.js";
import { useContext, useState } from "react";
import climateOfWeather from "./climateOfWeather.js";
import CitiesExemple from "./CitiesExemple.jsx";
import { getForeCast, getWather } from "./findCity.js";
import { Context } from "../../Contex/Contex.jsx";

export default function Weather({ weather, setWeather, setTableForecast }) {
  const date = dateAtcual();

  const [searchCity, setSearchCity] = useState({ city: "" });
  const [choseCity, setChoseCity] = useState();

  const { changeColor } = useContext(Context);
  const infomationWeather = climateOfWeather(
    weather?.weather.map((w) => w.main)
  );
  console.log(infomationWeather)
  

  function search(e) {
    e.preventDefault();

    getWather(searchCity.city || choseCity, setWeather);
    getForeCast(searchCity.city || choseCity, setTableForecast);

    setSearchCity({ city: "" });
  }

  return (
    <Container status={changeColor}>
      <div className="title">
        <img src={coat} alt="This is a photo of a coat blue" />
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
  
  background-color: ${(props) =>
    props.status === "light" ? "#FFFFFF" : "#e4e4e4"};
  border: 1px solid
    ${(props) => (props.status === "light" ? "#FFFFFF" : "#e4e4e4")};

  .title {
    display: flex;
    width: 416px;
    height: 96px;

    margin: 60px auto;
    color: ${(props) => (props.status === "light" ? "#000000" : "#FFFFFF")};
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
    width: 325px;
    height: 50px;

    margin: 0px auto;

    background: #ededef;

    border: 1px solid #ededef;
    border-radius: 24px;
    box-shadow: 0px 24px 48px 0px #314f7c14;

    left: 152px;
  }

  input {
    padding-left: 25px;

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
      width: 200px;
      margin-bottom: 35px;
      margin-left: 55px;
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
    border: 2px solid
      ${(props) => (props.status === "light" ? "#ededed" : "#000000")};
    border-radius: 8px;

    margin: 0px auto;
  }

  .date {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 60px;
    margin-top: 50px;

    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: center;

    color: #000000;

    h2 {
      position: relative;
      bottom: 20px;
    }
  }
`;

