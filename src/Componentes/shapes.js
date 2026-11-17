import PropTypes from "prop-types";

// Formato (parcial) da resposta de /data/2.5/weather da OpenWeatherMap
export const weatherShape = PropTypes.shape({
  name: PropTypes.string,
  coord: PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }),
  main: PropTypes.shape({
    temp: PropTypes.number,
    temp_min: PropTypes.number,
    temp_max: PropTypes.number,
    humidity: PropTypes.number,
  }),
  wind: PropTypes.shape({ speed: PropTypes.number }),
  weather: PropTypes.arrayOf(PropTypes.shape({ main: PropTypes.string })),
});

// Formato (parcial) da resposta de /data/2.5/forecast da OpenWeatherMap
export const forecastShape = PropTypes.shape({
  city: PropTypes.shape({ timezone: PropTypes.number }),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number,
      main: PropTypes.shape({ temp: PropTypes.number }),
    })
  ),
});
