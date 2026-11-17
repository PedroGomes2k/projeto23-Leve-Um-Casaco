import styled from "styled-components";
import { useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Context } from "../../Contex/Contex";
import { dateAndHour, dateSubtitle } from "../Forecast/dateForTable";
import { getRainForecast, rainFromOpenWeather } from "./findRain";
import {
  formatMm,
  formatProbability,
  hoursOfForecast,
  presetsOfForecast,
  rangeOfPreset,
  summaryOfRain,
} from "./rainHelpers";
import RainCharts from "./RainCharts.jsx";
import RainTable from "./RainTable.jsx";

const DEFAULT_HOURS = 48;

export default function Rain({ weather, tableForecast }) {
  const { changeColor } = useContext(Context);

  const [open, setOpen] = useState(false);
  const [rain, setRain] = useState();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [range, setRange] = useState();
  const [mode, setMode] = useState("chart");

  const lastRequest = useRef(0);
  const openButton = useRef();
  const closeButton = useRef();
  const titleId = useId();

  const cityKey = weather ? `${weather.coord.lat},${weather.coord.lon}` : "";
  const data = rain?.key === cityKey ? rain : undefined;

  function loadRain() {
    lastRequest.current = lastRequest.current + 1;
    const request = lastRequest.current;

    setLoading(true);
    setFailed(false);

    getRainForecast(weather.coord.lat, weather.coord.lon)
      .catch((err) => {
        console.log(err);
        if (!tableForecast?.length) throw err;

        const fallback = rainFromOpenWeather(tableForecast, weather.timezone);
        return { ...fallback, fallback: true };
      })
      .then((res) => {
        if (request !== lastRequest.current) return;

        setRain({ ...res, key: cityKey });
        setRange(rangeOfPreset(res.hours, DEFAULT_HOURS));
        setLoading(false);
      })
      .catch(() => {
        if (request !== lastRequest.current) return;
        setLoading(false);
        setFailed(true);
      });
  }

  function openModal() {
    setOpen(true);
    loadRain();
  }

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    const button = openButton.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <OpenButton
        ref={openButton}
        type="button"
        $status={changeColor}
        onClick={openModal}
        disabled={!weather}
        aria-haspopup="dialog"
      >
        <ion-icon name="rainy-outline"></ion-icon>
        Chuva hora a hora
      </OpenButton>

      {open &&
        createPortal(
          <Overlay $status={changeColor} onClick={closeModal}>
            <Dialog
              $status={changeColor}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
            >
              <header>
                <div>
                  <h2 id={titleId}>Chuva hora a hora</h2>
                  <p className="subtitle">
                    {weather.name}
                    {data && ` · ${subtitleOfForecast(data)}`}
                  </p>
                </div>
                <button
                  ref={closeButton}
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Fechar"
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </header>

              {!data && loading && (
                <p className="status">Carregando a previsão de chuva...</p>
              )}

              {!data && failed && (
                <p className="status">
                  Não foi possível carregar a previsão de chuva. Tente novamente
                  em instantes.
                </p>
              )}

              {data && range && (
                <RainContent
                  data={data}
                  range={range}
                  setRange={setRange}
                  mode={mode}
                  setMode={setMode}
                  loading={loading}
                  status={changeColor}
                />
              )}
            </Dialog>
          </Overlay>,
          document.body
        )}
    </>
  );
}

function subtitleOfForecast(data) {
  const total = hoursOfForecast(data.hours, data.stepHours);
  const last = data.hours[data.hours.length - 1].dt;
  const every = data.stepHours === 1 ? "hora a hora" : "de 3 em 3 horas";

  return `${total} horas de previsão, ${every}, até ${dateSubtitle(
    last,
    data.timezone
  )}`;
}

function RainContent({ data, range, setRange, mode, setMode, loading, status }) {
  const { hours, timezone, stepHours } = data;

  const view = hours.slice(range.startIndex, range.endIndex + 1);
  const summary = summaryOfRain(view);
  const presets = presetsOfForecast(hours, stepHours);

  function choosePreset(presetHours) {
    setRange(rangeOfPreset(hours, presetHours));
  }

  function isActive(presetHours) {
    const preset = rangeOfPreset(hours, presetHours);
    return (
      preset.startIndex === range.startIndex &&
      preset.endIndex === range.endIndex
    );
  }

  return (
    <Content $status={status} style={{ opacity: loading ? 0.6 : 1 }}>
      {data.fallback && (
        <p className="warning">
          Não foi possível carregar a previsão hora a hora agora. Mostrando a
          previsão de 3 em 3 horas do OpenWeatherMap.
        </p>
      )}

      <div className="filters">
        <div className="group" role="group" aria-label="Período">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              className={isActive(p.hours) ? "active" : ""}
              aria-pressed={isActive(p.hours)}
              onClick={() => choosePreset(p.hours)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="group" role="group" aria-label="Visualização">
          <button
            type="button"
            className={mode === "chart" ? "active" : ""}
            aria-pressed={mode === "chart"}
            onClick={() => setMode("chart")}
          >
            Gráfico
          </button>
          <button
            type="button"
            className={mode === "table" ? "active" : ""}
            aria-pressed={mode === "table"}
            onClick={() => setMode("table")}
          >
            Tabela
          </button>
        </div>
      </div>

      <p className="period">
        De {dateAndHour(view[0].dt, timezone)} até{" "}
        {dateAndHour(view[view.length - 1].dt, timezone)}
      </p>

      <div className="cards">
        <div className="card">
          <h4>Maior chance</h4>
          <strong>{formatProbability(summary.maxProbability?.probability)}</strong>
          <span>
            {summary.maxProbability
              ? dateAndHour(summary.maxProbability.dt, timezone)
              : "Sem dados"}
          </span>
        </div>
        <div className="card">
          <h4>Chuva acumulada</h4>
          <strong>{formatMm(summary.total)} mm</strong>
          <span>no período escolhido</span>
        </div>
        <div className="card">
          <h4>Hora mais chuvosa</h4>
          <strong>{formatMm(summary.wettest?.mm)} mm</strong>
          <span>
            {summary.wettest?.mm > 0
              ? dateAndHour(summary.wettest.dt, timezone)
              : "Sem chuva prevista"}
          </span>
        </div>
      </div>

      {mode === "chart" ? (
        <RainCharts
          hours={hours}
          range={range}
          setRange={setRange}
          timezone={timezone}
        />
      ) : (
        <RainTable hours={view} timezone={timezone} />
      )}

      <p className="source">
        Dados:{" "}
        {data.source === "Open-Meteo" ? (
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo.com
          </a>
        ) : (
          "OpenWeatherMap"
        )}
      </p>
    </Content>
  );
}

const OpenButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0px 16px;

  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;

  color: #ffffff;
  background: ${(props) =>
    props.$status === "light"
      ? "linear-gradient(117.33deg, #4d4494 22.83%, #4f43ae 90.03%)"
      : "linear-gradient(117.33deg, #4f46e5 22.83%, #3730a3 90.03%)"};

  border: none;
  border-radius: 20px;
  box-shadow: 0px 4px 12px 0px
    ${(props) => (props.$status === "light" ? "#314f7c29" : "#00000059")};

  cursor: pointer;

  ion-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: 2px solid
      ${(props) => (props.$status === "light" ? "#4d4494" : "#818cf8")};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  overflow-y: auto;

  background-color: ${(props) =>
    props.$status === "light" ? "#00000066" : "#000000a6"};

  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 24px 28px;

  border-radius: 20px;
  border: 1px solid
    ${(props) => (props.$status === "light" ? "#ededef" : "#334155")};
  box-shadow: 0px 24px 48px 0px #00000040;

  font-family: "Poppins", sans-serif;
  background-color: ${(props) =>
    props.$status === "light" ? "#ffffff" : "#1e293b"};
  color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  h2 {
    font-size: 26px;
    font-weight: 600;
    line-height: 36px;
  }

  .subtitle {
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
  }

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;

    border: none;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$status === "light" ? "#ededef" : "#334155"};
    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

    cursor: pointer;

    ion-icon {
      width: 22px;
      height: 22px;
    }

    &:hover {
      background-color: ${(props) =>
        props.$status === "light" ? "#dcdce0" : "#475569"};
    }
  }

  .status {
    padding: 60px 0px;
    text-align: center;
    color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
  }

  @media (max-width: 480px) {
    padding: 20px 16px;

    h2 {
      font-size: 22px;
      line-height: 30px;
    }
  }
`;

const Content = styled.div`
  transition: opacity 0.2s;

  .warning {
    margin-top: 16px;
    padding: 10px 14px;

    font-size: 13px;
    line-height: 20px;

    border-radius: 10px;
    background-color: ${(props) =>
      props.$status === "light" ? "#fef3c7" : "#422006"};
    color: ${(props) => (props.$status === "light" ? "#78350f" : "#fde68a")};
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    margin-top: 20px;
  }

  .group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .group button {
    height: 34px;
    padding: 0px 14px;

    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-weight: 600;

    border-radius: 17px;
    border: 1px solid
      ${(props) => (props.$status === "light" ? "#ededef" : "#475569")};
    background-color: ${(props) =>
      props.$status === "light" ? "#ededef" : "#334155"};
    color: ${(props) => (props.$status === "light" ? "#000000" : "#f1f5f9")};

    cursor: pointer;

    &:hover {
      border-color: ${(props) =>
        props.$status === "light" ? "#4d4494" : "#818cf8"};
    }

    &.active {
      border-color: transparent;
      background-color: ${(props) =>
        props.$status === "light" ? "#4d4494" : "#4f46e5"};
      color: #ffffff;
    }
  }

  .period {
    margin-top: 16px;

    font-size: 13px;
    line-height: 20px;
    color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }

  .card {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;

    border-radius: 14px;
    background-color: ${(props) =>
      props.$status === "light" ? "#f5f5f7" : "#0f172a"};

    h4 {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
    }

    strong {
      font-size: 26px;
      font-weight: 600;
      line-height: 36px;
    }

    span {
      font-size: 12px;
      line-height: 18px;
      color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};
    }
  }

  .source {
    margin-top: 16px;

    font-size: 12px;
    line-height: 18px;
    text-align: right;
    color: ${(props) => (props.$status === "light" ? "#666666" : "#94a3b8")};

    a {
      color: inherit;
    }
  }

  @media (max-width: 480px) {
    .cards {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .card {
      padding: 10px 12px;

      strong {
        font-size: 20px;
        line-height: 30px;
      }
    }

    .card:last-child {
      grid-column: span 2;
    }
  }
`;
