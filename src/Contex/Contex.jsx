import { useState, createContext } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { themes } from "../style/theme.js";

export const Context = createContext();

export function ContexProvider({ children }) {
  const [changeColor, setChangeColor] = useState("light");

  return (
    <Context.Provider value={{ changeColor, setChangeColor }}>
      <ThemeProvider theme={themes[changeColor]}>{children}</ThemeProvider>
    </Context.Provider>
  );
}

ContexProvider.propTypes = {
  children: PropTypes.node,
};
