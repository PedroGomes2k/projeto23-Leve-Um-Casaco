import { timeColors } from "./colorsOfWaether";

export default function climateOfWeather(climate) {
  const color = [];
  const textClimate = [];

  climate?.forEach((c) => {
    const matchingColor = timeColors.find((tc) => tc.climate === c);
    if (matchingColor) {
      color.push(matchingColor.color);
      textClimate.push(matchingColor.textClimate);
    }
  });

  return { color: color[0], textClimate: textClimate[0] };
}
