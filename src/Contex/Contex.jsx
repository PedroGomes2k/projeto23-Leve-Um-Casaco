import { useState, createContext } from "react";

export const Context = createContext();

export function ContexProvider({ children }) {
  const [changeColor, setChangeColor] = useState("light");

  return (
    <Context.Provider value={{ changeColor, setChangeColor }}>
      {children}
    </Context.Provider>
  );
}
