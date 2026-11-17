// Valores possíveis de `weather[0].main` na OpenWeatherMap:
// https://openweathermap.org/weather-conditions
//
// `color` é usado no modo claro; `darkColor` no modo escuro (tons 100–400 do
// Tailwind CSS, que mantêm contraste sobre o fundo slate).
export const timeColors = [
  { climate: "Clear", color: "#ec6e4c", darkColor: "#fb923c", textClimate: "Céu aberto" },
  { climate: "Clouds", color: "#9b9ca0dc", darkColor: "#cbd5e1", textClimate: "Nublado" },
  { climate: "Rain", color: "#273becdc", darkColor: "#60a5fa", textClimate: "Chovendo" },
  { climate: "Drizzle", color: "#4ea0ec", darkColor: "#7dd3fc", textClimate: "Chuviscando" },
  { climate: "Thunderstorm", color: "#c047dfdc", darkColor: "#c084fc", textClimate: "Tempestade" },
  { climate: "Snow", color: "#7fb3d5", darkColor: "#e0f2fe", textClimate: "Nevando" },
  { climate: "Mist", color: "#a9b4c2", darkColor: "#94a3b8", textClimate: "Neblina" },
  { climate: "Fog", color: "#a9b4c2", darkColor: "#94a3b8", textClimate: "Nevoeiro" },
  { climate: "Haze", color: "#a9b4c2", darkColor: "#94a3b8", textClimate: "Névoa seca" },
  { climate: "Smoke", color: "#b59a7a", darkColor: "#d6d3d1", textClimate: "Fumaça" },
  { climate: "Dust", color: "#b59a7a", darkColor: "#d6d3d1", textClimate: "Poeira" },
  { climate: "Sand", color: "#b59a7a", darkColor: "#d6d3d1", textClimate: "Areia" },
  { climate: "Ash", color: "#b59a7a", darkColor: "#d6d3d1", textClimate: "Cinzas" },
  { climate: "Squall", color: "#6b6f80", darkColor: "#a5b4fc", textClimate: "Rajadas de vento" },
  { climate: "Tornado", color: "#6b6f80", darkColor: "#a5b4fc", textClimate: "Tornado" },
];
