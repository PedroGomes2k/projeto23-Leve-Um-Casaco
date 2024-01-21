export default function climateOfWeather(climate) {
  const timeColors = [
    { climate: "Snow", color: "#eeeae9dd", textClimate: "Nevando" },
    { climate: "Clear", color: "#ec6e4c ", textClimate: "Céu aberto" },
    { climate: "Rain", color: "#273becdc", textClimate: "Chovendo" },
    { climate: "Clouds", color: "#9b9ca0dc", textClimate: "Nublado" },
    {
      climate: "ThunderStorm",
      color: "#c047dfdc",
      textClimate: "Tempestade",
    },
    { climate: "Drizzle", color: "#4ea0ec7a", textClimate: "Chuviscando" },
    { climate: "Mist", color: "#eeeae9dd", textClimate: "Neblina" },
  ];

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
