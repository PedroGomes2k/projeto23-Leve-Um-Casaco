import styled from "styled-components";
import Informations from "./Informations.jsx";
import TableOfTime from "./TableOfTime.jsx";

export default function Forecast() {
  return (
    <Container>
      <div className="menu">
        <div className="city">
          <h2 /*font-size={17}*/>Previsão do tempo para...</h2>
          <h1 /*font-size={50}*/>São Paulo</h1>
          <h3 /*font-size={15}*/>Latitude: 44.4°</h3>
          <h3 /*font-size={15}*/>Longitude: 10.99°</h3>
        </div>

        <Informations />

        <TableOfTime />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 1258px;
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: #efefef;
  border: 1px solid #d8d8d8;

  .menu {
    margin-left: 30px;
  }

  .city {
    h1,
    h2,
    h2 {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
