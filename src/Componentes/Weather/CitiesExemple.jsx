import styled from "styled-components";

export default function CitiesExemple({ setChoseCity, search }) {
  const cities = [
    { id: 1, city: "SP" },
    { id: 2, city: "DF" },
    { id: 3, city: "BH" },
    { id: 4, city: "RJ" },
  ];

  function choseCity(city) {
    if (city === "SP") return setChoseCity("Sao Paulo");
    if (city === "DF") return setChoseCity("Brasilia");
    if (city === "BH") return setChoseCity("Belo Horizonte");
    if (city === "RJ") return setChoseCity("Rio de Janeiro");
  }

  return (
    <Container>
      {cities.map((ct) => (
        <form key={ct.id} onSubmit={search} className="test">
          <button type="submit" onClick={() => choseCity(ct.city)}>
            {ct.city}
          </button>
        </form>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 50px;

  margin: 0px auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-evenly;

  .test,
  button {
    display: flex;
    width: 80px;
    height: 40px;

    border-radius: 4px;
    border: 1px solid #ededef;
    box-shadow: 0px 0px 8px 3px #314f7c14;
    justify-content: center;
    align-items: center;

    background-color: #ededef;

    cursor: pointer;
  }
`;
