import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { dateSubtitle } from "./dateForTable";
import { useContext } from "react";
import { Context } from "../../Contex/Contex";

export default function TableOfTime({ tableForecast }) {
  const data = [];

  const { changeColor } = useContext(Context);

  for (let i = 0; i < tableForecast?.length; i++) {
    let temp = parseFloat(tableForecast[i].main.temp);
    const day = dateSubtitle(tableForecast[i].dt_txt);

    const novoObjeto = { day: day, temp: temp };

    data.push(novoObjeto);
  }

  return (
    <Container status={changeColor}>
      <h1>Próximos dias</h1>

      <Table status={changeColor}>
        <LineChart
          width={720}
          height={290}
          data={data}
          margin={{
            top: 30,
            right: 15,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 0" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke=" #4d4494"
            activeDot={{ r: 6 }}
          />
        </LineChart>
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

    color: ${(props) => (props.status === "light" ? "#000000" : "#FFFFFF")};
    //
  }
`;

const Table = styled.div`
  width: 750px;
  height: 300px;
  top: 566px;
  left: 712px;
  border: 1px solid #d8d8d8;

  background-color: ${(props) =>
    props.status === "light" ? "#ffffff" : "#eeeded"};
`;
