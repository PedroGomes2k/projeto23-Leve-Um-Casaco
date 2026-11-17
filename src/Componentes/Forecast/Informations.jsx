import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../Contex/Contex";

export default function Informations({
  tempMin,
  tempMax,
  humidity,
  wind,
  coat,
}) {
  const { changeColor } = useContext(Context);

  function modeColor() {
    if (changeColor === "light")
      return "linear-gradient(117.33deg, #4d4494 22.83%, #4f43ae 90.03%)";
    if (changeColor === "dark")
      return "linear-gradient(117.33deg, #4f46e5 22.83%, #3730a3 90.03%)";
  }

  function showValue(value) {
    if (value === undefined) return "--";
    return Math.round(value);
  }

  return (
    <Container $status={changeColor}>
      <div className="containerCards">
        <CardInformation style={{ background: modeColor() }}>
          <h2>Mínima</h2>
          <h1>{showValue(tempMin)}°C</h1>
        </CardInformation>
        <CardInformation style={{ background: modeColor() }}>
          <h2>Máxima</h2>
          <h1>{showValue(tempMax)}°C</h1>
        </CardInformation>
        <CardInformation style={{ background: modeColor() }}>
          <h2>Umidade</h2>
          <h1>{showValue(humidity)}%</h1>
        </CardInformation>
        <CardInformation style={{ background: modeColor() }}>
          <h2>Vento</h2>
          <h1>{showValue(wind)}m/s</h1>
        </CardInformation>
      </div>
      <p>{coat}</p>
    </Container>
  );
}
const Container = styled.div`
  .containerCards {
    display: flex;
    flex-wrap: wrap;
    gap: 0px 20px;
  }

  p {
    display: flex;
    align-items: center;
    min-height: 48px;
    margin-top: 10px;

    font-family: "Poppins", sans-serif;
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;

    color: ${(props) => (props.$status === "light" ? "#afadad" : "#94a3b8")};
  }
`;

const CardInformation = styled.div`
  width: 160px;
  height: 80px;

  margin-top: 25px;

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
`;
