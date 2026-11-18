import styled from "styled-components";
import { useContext } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Context } from "../../Contex/Contex";
import { dateAndHour, dateSubtitle } from "../Forecast/dateForTable";
import {
  axisOfMm,
  formatAxis,
  formatMm,
  formatProbability,
  ticksOfWindow,
  tickLabel,
} from "./rainHelpers";

const AXIS_WIDTH = 44;
const MARGIN = { top: 8, right: 16, left: 0, bottom: 0 };

export default function RainCharts({ hours, range, setRange, timezone }) {
  const { changeColor } = useContext(Context);

  function colorOfTable(light, dark) {
    if (changeColor === "light") return light;
    if (changeColor === "dark") return dark;
  }

  const colors = {
    probability: colorOfTable("#4d4494", "#6d71e8"),
    mm: colorOfTable("#0891b2", "#0e9fbf"),
    surface: colorOfTable("#ffffff", "#1e293b"),
    text: colorOfTable("#000000", "#f1f5f9"),
    grid: colorOfTable("#e5e5e5", "#334155"),
    axis: colorOfTable("#666666", "#94a3b8"),
    cursor: colorOfTable("#999999", "#64748b"),
    wash: colorOfTable("#4d449414", "#818cf814"),
  };

  const view = hours.slice(range.startIndex, range.endIndex + 1);
  const { ticks, step } = ticksOfWindow(view, timezone);
  const axisMm = axisOfMm(view);
  const xFormater = (dt) => tickLabel(dt, timezone, step);

  const axisProps = {
    stroke: colors.grid,
    tick: { fill: colors.axis, fontSize: 12 },
    tickLine: false,
  };

  return (
    <Container $status={changeColor}>
      <h3>
        <span
          className="key line"
          style={{ background: colors.probability }}
        ></span>
        Probabilidade de chuva
      </h3>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart
          data={view}
          syncId="rain"
          syncMethod="value"
          margin={MARGIN}
        >
          <CartesianGrid vertical={false} stroke={colors.grid} />
          <XAxis
            dataKey="dt"
            ticks={ticks}
            tick={false}
            height={2}
            stroke={colors.grid}
          />
          <YAxis
            {...axisProps}
            width={AXIS_WIDTH}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            content={<RainTooltip timezone={timezone} colors={colors} />}
            cursor={{ stroke: colors.cursor, strokeWidth: 1 }}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="probability"
            stroke={colors.probability}
            strokeWidth={2}
            fill={colors.probability}
            fillOpacity={0.1}
            dot={false}
            activeDot={{
              r: 5,
              fill: colors.probability,
              stroke: colors.surface,
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <h3>
        <span className="key bar" style={{ background: colors.mm }}></span>
        Chuva prevista (mm)
      </h3>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart
          data={view}
          syncId="rain"
          syncMethod="value"
          margin={MARGIN}
          barCategoryGap="12%"
        >
          <CartesianGrid vertical={false} stroke={colors.grid} />
          <XAxis
            {...axisProps}
            dataKey="dt"
            ticks={ticks}
            interval="preserveStartEnd"
            minTickGap={12}
            tickFormatter={xFormater}
          />
          <YAxis
            {...axisProps}
            width={AXIS_WIDTH}
            domain={[0, axisMm.top]}
            ticks={axisMm.ticks}
            tickFormatter={formatAxis}
          />
          <Tooltip
            content={() => null}
            cursor={{ fill: colors.wash }}
            isAnimationActive={false}
          />
          <Bar
            dataKey="mm"
            fill={colors.mm}
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>

      <p className="hint">Arraste a seleção abaixo para ver outras horas</p>
      <ResponsiveContainer width="100%" height={52}>
        <AreaChart
          data={hours}
          margin={{ ...MARGIN, top: 0, left: AXIS_WIDTH }}
        >
          <Brush
            dataKey="dt"
            height={48}
            startIndex={range.startIndex}
            endIndex={range.endIndex}
            onChange={({ startIndex, endIndex }) =>
              setRange({ startIndex, endIndex })
            }
            tickFormatter={(dt) => dateSubtitle(dt, timezone)}
            stroke={colors.probability}
            fill={colors.surface}
            travellerWidth={10}
          >
            <AreaChart data={hours}>
              <YAxis hide domain={[0, 100]} />
              <Area
                type="monotone"
                dataKey="probability"
                stroke={colors.probability}
                strokeWidth={1}
                fill={colors.probability}
                fillOpacity={0.1}
                isAnimationActive={false}
              />
            </AreaChart>
          </Brush>
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

function RainTooltip({ active, payload, timezone, colors }) {
  if (!active || !payload?.length) return null;

  const hour = payload[0].payload;

  return (
    <TooltipBox
      style={{
        background: colors.surface,
        borderColor: colors.grid,
        color: colors.text,
      }}
    >
      <p className="label" style={{ color: colors.axis }}>
        {dateAndHour(hour.dt, timezone)}
      </p>
      <p>
        <span
          className="key"
          style={{ background: colors.probability }}
        ></span>
        <strong>{formatProbability(hour.probability)}</strong> de chance
      </p>
      <p>
        <span className="key" style={{ background: colors.mm }}></span>
        <strong>{formatMm(hour.mm)} mm</strong> de chuva
      </p>
    </TooltipBox>
  );
}

const Container = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0px 6px;

    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;

    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};
  }

  .key {
    display: inline-block;
    border-radius: 2px;
  }

  .key.line {
    width: 14px;
    height: 3px;
  }

  .key.bar {
    width: 10px;
    height: 12px;
  }

  .hint {
    margin: 14px 0px 4px ${AXIS_WIDTH}px;

    font-family: "Poppins", sans-serif;
    font-size: 12px;
    line-height: 18px;

    color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
  }

  .recharts-brush-traveller rect {
    fill: ${(props) => (props.$status === "light" ? "#4d4494" : "#6d71e8")};
  }

  .recharts-brush-texts text {
    font-size: 11px;
    fill: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
  }
`;

const TooltipBox = styled.div`
  padding: 8px 12px;

  border: 1px solid;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px #00000026;

  font-family: "Poppins", sans-serif;
  font-size: 13px;
  line-height: 22px;

  p {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .label {
    margin-bottom: 2px;
    font-size: 12px;
  }

  .key {
    display: inline-block;
    width: 12px;
    height: 3px;
    border-radius: 2px;
  }

  strong {
    font-weight: 600;
  }
`;
