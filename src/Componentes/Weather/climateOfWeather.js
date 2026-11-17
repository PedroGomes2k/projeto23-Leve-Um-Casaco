import { timeColors } from "./colorsOfWaether";

export default function climateOfWeather(climate, changeColor) {
  const color = [];
  const textClimate = [];

  climate?.forEach((c) => {
    const matchingColor = timeColors.find((tc) => tc.climate === c);
    if (matchingColor) {
      if (changeColor === "dark") color.push(matchingColor.darkColor);
      if (changeColor === "light") color.push(matchingColor.color);
      textClimate.push(matchingColor.textClimate);
    }
  });

  return { color: color[0], textClimate: textClimate[0] };
}
