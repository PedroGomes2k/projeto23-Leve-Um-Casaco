import { timeColors } from "./colorsOfWaether";

export default function climateOfWeather(climate, changeColor) {
  const color = [];
  const textClimate = [];
  const tone = [];

  climate?.forEach((c) => {
    const matchingColor = timeColors.find((tc) => tc.climate === c);
    if (matchingColor) {
      if (changeColor === "dark") {
        color.push(matchingColor.darkColor);
        tone.push(matchingColor.darkTone);
      }
      if (changeColor === "light") {
        color.push(matchingColor.color);
        tone.push(matchingColor.tone);
      }
      textClimate.push(matchingColor.textClimate);
    }
  });

  return { color: color[0], textClimate: textClimate[0], tone: tone[0] };
}
