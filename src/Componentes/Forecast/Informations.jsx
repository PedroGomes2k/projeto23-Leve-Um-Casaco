import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../Contex/Contex";

export default function Informations({
  tempMin,
  tempMax,
  humidity,
  wind,
  tips,
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
      {tips.length > 0 && (
        <ul className="tips" aria-label="O que levar">
          {tips.map((tip) => (
            <li key={tip.text}>
              <span aria-hidden="true">{tip.icon}</span>
              {tip.text}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
const Container = styled.div`
  .containerCards {
    display: flex;
    flex-wrap: wrap;
    gap: 0px 20px;
  }

  .tips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 24px 0px 12px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px 8px 12px;

    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;

    border-radius: 20px;
    border: 1px solid
      ${(props) => (props.$status === "light" ? "#dfe2e8" : "#334155")};
    background-color: ${(props) =>
      props.$status === "light" ? "#f8f9fb" : "#1e293b"};
    color: ${(props) => (props.$status === "light" ? "#1f2937" : "#f1f5f9")};

    span {
      font-size: 20px;
    }
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
