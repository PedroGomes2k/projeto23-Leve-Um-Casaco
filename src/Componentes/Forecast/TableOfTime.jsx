import { useContext } from "react";
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
import { Context } from "../../Contex/Contex";
import { forecastShape } from "../shapes.js";
import { dateAndHour, dateSubtitle, dayKey } from "./dateForTable";

// A previsão vem de 3 em 3 horas (8 pontos por dia). Mostra um rótulo por dia,
// no primeiro ponto daquele dia; o primeiro dia só ganha rótulo se tiver pontos
// suficientes para não encostar no rótulo do dia seguinte.
function dayTicks(data, timezone) {
  const changes = [];
  for (let i = 1; i < data.length; i++) {
    if (dayKey(data[i].dt, timezone) !== dayKey(data[i - 1].dt, timezone)) {
      changes.push(i);
    }
  }

  const firstChange = changes[0] ?? data.length;
  const indexes = firstChange >= 6 ? [0, ...changes] : changes;

  return indexes.map((i) => data[i].dt);
}

export default function TableOfTime({ forecast }) {
  const { changeColor } = useContext(Context);

  const timezone = forecast?.city?.timezone ?? 0;
  const data = (forecast?.list ?? []).map((item) => ({
    dt: item.dt,
    temp: Math.round(item.main.temp * 10) / 10,
  }));

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
            <CartesianGrid strokeDasharray="1 0" />
            <XAxis
              dataKey="dt"
              ticks={dayTicks(data, timezone)}
              interval="preserveStartEnd"
              minTickGap={8}
              tickFormatter={(dt) => dateSubtitle(dt, timezone)}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(dt) => dateAndHour(dt, timezone)}
              formatter={(value) => [`${value} °C`, "Temperatura"]}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#4d4494"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Table>
    </Container>
  );
}

TableOfTime.propTypes = {
  forecast: forecastShape,
};

const Container = styled.div`
  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 23px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;

    color: ${(props) => (props.$status === "light" ? "#000000" : "#FFFFFF")};
  }
`;

const Table = styled.div`
  width: 100%;
  max-width: 750px;
  height: 300px;
  border: 1px solid #d8d8d8;

  background-color: ${(props) =>
    props.$status === "light" ? "#ffffff" : "#eeeded"};
`;
