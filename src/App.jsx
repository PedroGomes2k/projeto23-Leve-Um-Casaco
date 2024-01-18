import { useState } from "react";
import styled from "styled-components";
import Weather from "./Componentes/Weather/index.jsx";
import Forecast from "./Componentes/Forecast/index.jsx";

function App() {
  return (
    <Container>
      <Weather />
      <Forecast />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 665px;

  display: flex;
`;

export default App;
