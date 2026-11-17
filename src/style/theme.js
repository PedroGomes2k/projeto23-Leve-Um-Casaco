// Tokens de cor dos dois modos do site.
//
// Modo claro: as cores originais do projeto.
// Modo escuro: paleta oficial do Tailwind CSS (slate, indigo, amber),
// https://tailwindcss.com/docs/colors — tons feitos para manter contraste
// legível (WCAG AA) sobre fundo escuro.

const light = {
  colorScheme: "light",
  pageBg: "#efefef",
  panelBg: "#ffffff",
  surface: "#ededef",
  surfaceBorder: "#ededef",
  text: "#000000",
  textMuted: "#afadad",
  placeholder: "#757575",
  divider: "#ededed",
  accent: "#4d4494",
  buttonBg: "#4d4494",
  shadow: "#314f7c14",
  cardGradient: "linear-gradient(117.33deg, #4d4494 22.83%, #4f43ae 90.03%)",
  cardText: "#ffffff",
  chartBg: "#ffffff",
  chartBorder: "#d8d8d8",
  chartGrid: "#cccccc",
  chartAxis: "#666666",
  chartLine: "#4d4494",
  tooltipBg: "#ffffff",
  tooltipBorder: "#cccccc",
  tooltipText: "#000000",
  toggleBg: "#000000",
  toggleBorder: "#000000",
  toggleIcon: "#efefef",
};

const dark = {
  colorScheme: "dark",
  pageBg: "#0f172a", // slate-900
  panelBg: "#1e293b", // slate-800
  surface: "#334155", // slate-700
  surfaceBorder: "#475569", // slate-600
  text: "#f1f5f9", // slate-100
  textMuted: "#94a3b8", // slate-400
  placeholder: "#94a3b8", // slate-400
  divider: "#334155", // slate-700
  accent: "#818cf8", // indigo-400
  buttonBg: "#4f46e5", // indigo-600
  shadow: "#00000059",
  cardGradient: "linear-gradient(117.33deg, #4f46e5 22.83%, #3730a3 90.03%)", // indigo-600 → indigo-800
  cardText: "#ffffff",
  chartBg: "#1e293b", // slate-800
  chartBorder: "#334155", // slate-700
  chartGrid: "#334155", // slate-700
  chartAxis: "#94a3b8", // slate-400
  chartLine: "#818cf8", // indigo-400
  tooltipBg: "#0f172a", // slate-900
  tooltipBorder: "#475569", // slate-600
  tooltipText: "#f1f5f9", // slate-100
  toggleBg: "#334155", // slate-700
  toggleBorder: "#475569", // slate-600
  toggleIcon: "#fbbf24", // amber-400
};

export const themes = { light, dark };
