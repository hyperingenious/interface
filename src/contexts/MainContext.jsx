import { createContext, useState } from "react";

export const MainContext = createContext();
const initialState = {
  state: "idle",
  data: null,
  error: null,
};

export const MainContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <MainContext.Provider value={{ state, setState }}>
      {children}
    </MainContext.Provider>
  );
};
