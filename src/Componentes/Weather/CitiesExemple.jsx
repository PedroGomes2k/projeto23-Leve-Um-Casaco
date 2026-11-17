import styled from "styled-components";
import PropTypes from "prop-types";

const cities = [
  { id: 1, label: "SP", name: "Sao Paulo" },
  { id: 2, label: "DF", name: "Brasilia" },
  { id: 3, label: "BH", name: "Belo Horizonte" },
  { id: 4, label: "RJ", name: "Rio de Janeiro" },
];

export default function CitiesExemple({ onSelectCity }) {
  return (
    <Container>
      {cities.map((ct) => (
        <button key={ct.id} type="button" onClick={() => onSelectCity(ct.name)}>
          {ct.label}
        </button>
      ))}
    </Container>
  );
}

CitiesExemple.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 400px;
  max-width: calc(100% - 32px);
  height: 50px;

  margin: 0px auto;
  margin-bottom: 40px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 40px;

    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.surfaceBorder};
    box-shadow: 0px 0px 8px 3px ${({ theme }) => theme.shadow};

    background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};

    cursor: pointer;
    transition: border-color 0.2s, background-color 0.3s, color 0.3s;

    &:hover,
    &:focus-visible {
      outline: none;
      border-color: ${({ theme }) => theme.accent};
    }
  }

  @media (max-width: 480px) {
    button {
      width: 64px;
    }
  }
`;
