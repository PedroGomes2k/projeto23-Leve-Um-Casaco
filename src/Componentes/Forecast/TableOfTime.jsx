import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { dateAndHour, dateSubtitle } from "./dateForTable";
import { useContext } from "react";
import { Context } from "../../Contex/Contex";

export default function TableOfTime({ tableForecast, timezone }) {
  const data = [];
  const daysOfTable = [];

  const { changeColor } = useContext(Context);

  for (let i = 0; i < tableForecast?.length; i++) {
    const dt = tableForecast[i].dt;
    const temp = Math.round(tableForecast[i].main.temp * 10) / 10;
    const day = dateSubtitle(dt, timezone);

    const novoObjeto = { dt, temp, day };

    if (i > 0 && day !== data[i - 1].day) daysOfTable.push(dt);

    data.push(novoObjeto);
  }

  const pointsOfFirstDay = data.findIndex((d) => d.dt === daysOfTable[0]);
  if (pointsOfFirstDay >= 6) daysOfTable.unshift(data[0].dt);

  function colorOfTable(light, dark) {
    if (changeColor === "light") return light;
    if (changeColor === "dark") return dark;
  }

  const tempFormater = (value) => [`${value} °C`, "Temperatura"];
  const dayFormater = (dt) => dateSubtitle(dt, timezone);
  const hourFormater = (dt) => dateAndHour(dt, timezone);

  return (
    <Container $status={changeColor}>
      <h1>Próximos dias</h1>

      <Table $status={changeColor}>
        <ResponsiveContainer width="100%" height={290}>
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 30,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="1 0"
              stroke={colorOfTable("#cccccc", "#334155")}
            />
            <XAxis
              dataKey="dt"
              ticks={daysOfTable}
              interval="preserveStartEnd"
              minTickGap={8}
              tickFormatter={dayFormater}
              stroke={colorOfTable("#666666", "#94a3b8")}
              tick={{ fill: colorOfTable("#666666", "#94a3b8") }}
            />
            <YAxis
              stroke={colorOfTable("#666666", "#94a3b8")}
              tick={{ fill: colorOfTable("#666666", "#94a3b8") }}
            />
            <Tooltip
              formatter={tempFormater}
              labelFormatter={hourFormater}
              contentStyle={{
                backgroundColor: colorOfTable("#ffffff", "#0f172a"),
                borderColor: colorOfTable("#cccccc", "#475569"),
                borderRadius: 8,
              }}
              labelStyle={{ color: colorOfTable("#000000", "#f1f5f9") }}
              itemStyle={{ color: colorOfTable("#4d4494", "#818cf8") }}
              cursor={{ stroke: colorOfTable("#cccccc", "#334155") }}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke={colorOfTable("#4d4494", "#818cf8")}
              strokeWidth={2}
              dot={{
                r: 3,
                fill: colorOfTable("#ffffff", "#1e293b"),
                stroke: colorOfTable("#4d4494", "#818cf8"),
              }}
              activeDot={{
                r: 6,
                fill: colorOfTable("#4d4494", "#818cf8"),
                stroke: colorOfTable("#ffffff", "#1e293b"),
              }}
            />
          </LineChart>
        </ResponsiveContainer>
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

    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};
  }
`;

const Table = styled.div`
  width: 100%;
  max-width: 750px;
  height: 300px;

  border: 1px solid
    ${(props) => (props.$status === "light" ? "#d8d8d8" : "#334155")};
  border-radius: 12px;
  overflow: hidden;

  background-color: ${(props) =>
    props.$status === "light" ? "#ffffff" : "#1e293b"};
`;
