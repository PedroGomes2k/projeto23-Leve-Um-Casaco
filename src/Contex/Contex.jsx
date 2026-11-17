import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

export function ContexProvider({ children }) {
  const [changeColor, setChangeColor] = useState("light");

  return (
    <Context.Provider value={{ changeColor, setChangeColor }}>
      {children}
    </Context.Provider>
  );
}

ContexProvider.propTypes = {
  children: PropTypes.node,
};
