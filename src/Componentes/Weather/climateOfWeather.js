import { timeColors } from "./colorsOfWaether";

const DEFAULT_CLIMATE = { color: "#9b9ca0", textClimate: "" };

// Recebe `weather[0].main` (ex.: "Clouds") e devolve a cor e o texto em português
export default function climateOfWeather(main) {
  if (!main) return DEFAULT_CLIMATE;

  const match = timeColors.find((tc) => tc.climate === main);
  if (!match) return { ...DEFAULT_CLIMATE, textClimate: main };

  return { color: match.color, textClimate: match.textClimate };
}
