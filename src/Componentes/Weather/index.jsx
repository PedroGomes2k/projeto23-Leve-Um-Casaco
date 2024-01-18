import styled from "styled-components";
import coat from "../../assets/coat.png";
import { dateAtcual } from "./dateComplete.js";

export default function Weather() {
  const date = dateAtcual();
  
  return (
    <Container>
      <div className="title">
        <img src={coat} alt="This is a photo of a coat" />
        <h1>Levo um casaquinho?</h1>
      </div>

      <input type="text" placeholder="  🔍  Procure por uma cidade" />

      <div className="temperature">
        <ion-icon name="ellipse"></ion-icon>
        <h1>23°C</h1>
        <h2>Céu aberto</h2>
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

  input {
    width: 350px;
    height: 50px;

    margin: 0px auto;

    background: #ededef;

    border: 1px solid #ededef;
    border-radius: 24px;
    box-shadow: 0px 24px 48px 0px #314f7c14;
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

      color: #ec6e4c;
    }
    ion-icon {
      width: 50px;
      height: 50px;
      color: #ec6e4c;
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
