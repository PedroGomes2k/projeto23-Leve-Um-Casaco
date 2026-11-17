import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../../Contex/Contex.jsx";

export default function CitiesExemple({ findCity }) {
  const { changeColor } = useContext(Context);

  const cities = [
    { id: 1, city: "SP" },
    { id: 2, city: "DF" },
    { id: 3, city: "BH" },
    { id: 4, city: "RJ" },
  ];

  function choseCity(city) {
    if (city === "SP") return findCity("Sao Paulo");
    if (city === "DF") return findCity("Brasilia");
    if (city === "BH") return findCity("Belo Horizonte");
    if (city === "RJ") return findCity("Rio de Janeiro");
  }

  return (
    <Container $status={changeColor}>
      {cities.map((ct) => (
        <button key={ct.id} type="button" onClick={() => choseCity(ct.city)}>
          {ct.city}
        </button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  max-width: calc(100% - 32px);
  height: 50px;

  margin: 0px auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-evenly;

  button {
    display: flex;
    width: 80px;
    height: 40px;

    border-radius: 4px;
    border: 1px solid
      ${(props) => (props.$status === "light" ? "#ededef" : "#475569")};
    box-shadow: 0px 0px 8px 3px
      ${(props) => (props.$status === "light" ? "#314f7c14" : "#00000059")};
    justify-content: center;
    align-items: center;

    background-color: ${(props) =>
      props.$status === "light" ? "#ededef" : "#334155"};
    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

    cursor: pointer;

    &:hover {
      border-color: ${(props) =>
        props.$status === "light" ? "#4d4494" : "#818cf8"};
    }
  }

  @media (max-width: 480px) {
    button {
      width: 64px;
    }
  }
`;
