import styled from "styled-components";
import PropTypes from "prop-types";
import { formatNumber, formatTemp } from "../../utils/format.js";

export default function Informations({
  tempMin,
  tempMax,
  humidity,
  wind,
  coat,
}) {
  const cards = [
    { title: "Mínima", value: formatTemp(tempMin) },
    { title: "Máxima", value: formatTemp(tempMax) },
    { title: "Umidade", value: formatNumber(humidity, { suffix: "%" }) },
    { title: "Vento", value: formatNumber(wind, { suffix: "m/s" }) },
  ];

  return (
    <Container>
      <div className="containerCards">
        {cards.map((card) => (
          <CardInformation key={card.title}>
            <h2>{card.title}</h2>
            <h1>{card.value}</h1>
          </CardInformation>
        ))}
      </div>
      <p>{coat}</p>
    </Container>
  );
}

Informations.propTypes = {
  tempMin: PropTypes.number,
  tempMax: PropTypes.number,
  humidity: PropTypes.number,
  wind: PropTypes.number,
  coat: PropTypes.string,
};

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

    color: ${({ theme }) => theme.textMuted};
  }
`;

const CardInformation = styled.div`
  display: flex;
  flex-direction: column;

  width: 160px;
  height: 80px;
  margin-top: 25px;

  border-radius: 20px;
  background: ${({ theme }) => theme.cardGradient};
  box-shadow: 0px 8px 24px 0px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.cardText};

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
`;
