import styled from "styled-components";

export default function TableOfTime() {
  return (
    <Container>
      <h1>Próximos dias</h1>

      <Table>
        add
      </Table>
    </Container>
  );
}

const Container = styled.div`
  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 23px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const Table = styled.div`
  width: 90%;
  height: 300px;
  top: 566px;
  left: 712px;
  border: 1px solid #d8d8d8;

  background-color: #ffffff;
`;
