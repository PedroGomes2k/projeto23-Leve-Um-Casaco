import { timeColors } from "./colorsOfWaether";

const DEFAULT_COLOR = { light: "#9b9ca0", dark: "#cbd5e1" };

// Recebe `weather[0].main` (ex.: "Clouds") e o modo ("light" ou "dark") e
// devolve a cor e o texto em português
export default function climateOfWeather(main, mode = "light") {
  const isDark = mode === "dark";
  const match = main ? timeColors.find((tc) => tc.climate === main) : undefined;

  if (!match) {
    return {
      color: isDark ? DEFAULT_COLOR.dark : DEFAULT_COLOR.light,
      textClimate: main ?? "",
    };
  }

  return {
    color: isDark ? match.darkColor : match.color,
    textClimate: match.textClimate,
  };
}
