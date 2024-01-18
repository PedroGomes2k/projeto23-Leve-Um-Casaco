import styled from "styled-components";

export default function Informations({ tempMin, tempMax, humidity, wind }) {
  return (
    <Container>
      <CardInformation>
        <h2>Mínima</h2>
        <h1>{parseInt(tempMin)}°C</h1>
      </CardInformation>
      <CardInformation>
        <h2>Máxima</h2>
        <h1>{parseInt(tempMax)}°C</h1>
      </CardInformation>
      <CardInformation>
        <h2>Umidade</h2>
        <h1>{humidity}%</h1>
      </CardInformation>
      <CardInformation>
        <h2>Vento</h2>
        <h1>{parseInt(wind)}m/s</h1>
      </CardInformation>

      <p>Não, voce não deve levar o casaquinho</p>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  p {
    margin-top: 15px;

    font-family: Poppins;
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;

    color: #afadad;
  }
`;

const CardInformation = styled.div`
  width: 160px;
  height: 80px;

  margin-top: 25px;
  margin-right: 20px;

  border-radius: 20px;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
  }

  h2 {
    margin: 0px auto;
    margin-top: 10px;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
  }

  color: #ffffff;
  background: linear-gradient(117.33deg, #4d4494 22.83%, #4f43ae 90.03%);
`;
