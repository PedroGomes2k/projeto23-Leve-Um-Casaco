import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../../Contex/Contex";
import { dateAndHour } from "../Forecast/dateForTable";
import { formatMm, formatProbability } from "./rainHelpers";

export default function RainTable({ hours, timezone }) {
  const { changeColor } = useContext(Context);

  return (
    <Container $status={changeColor} tabIndex={0}>
      <table>
        <thead>
          <tr>
            <th scope="col">Horário</th>
            <th scope="col">Chance de chuva</th>
            <th scope="col">Chuva (mm)</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((h) => (
            <tr key={h.dt}>
              <td>{dateAndHour(h.dt, timezone)}</td>
              <td>{formatProbability(h.probability)}</td>
              <td>{formatMm(h.mm)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  max-height: 400px;
  margin-top: 16px;
  overflow-y: auto;

  border: 1px solid
    ${(props) => (props.$status === "light" ? "#e5e5e5" : "#334155")};
  border-radius: 12px;

  table {
    width: 100%;
    border-collapse: collapse;

    font-family: "Poppins", sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
  }

  th,
  td {
    padding: 8px 12px;
    text-align: right;
    white-space: nowrap;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;

    font-weight: 600;

    background-color: ${(props) =>
      props.$status === "light" ? "#f5f5f7" : "#0f172a"};
  }

  td {
    border-top: 1px solid
      ${(props) => (props.$status === "light" ? "#eeeeee" : "#334155")};
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 8px;
      font-size: 13px;
      white-space: normal;
    }
  }
`;
