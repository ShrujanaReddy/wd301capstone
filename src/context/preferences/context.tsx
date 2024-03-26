import React, { createContext, useContext, useReducer } from "react";
import { PreferencesState, PreferencesActions, initialPreferencesState, preferencesReducer } from "./reducer";

const PreferencesStateContext = createContext<PreferencesState | undefined>(undefined);
const PreferencesDispatchContext = createContext<React.Dispatch<PreferencesActions> | undefined>(undefined);

export const usePreferencesState = (): PreferencesState => {
  const context = useContext(PreferencesStateContext);
  if (context === undefined) {
    throw new Error("usePreferencesState must be used within a PreferencesProvider");
  }
  return context;
};

export const usePreferencesDispatch = (): React.Dispatch<PreferencesActions> => {
  const context = useContext(PreferencesDispatchContext);
  if (context === undefined) {
    throw new Error("usePreferencesDispatch must be used within a PreferencesProvider");
  }
  return context;
};

export const PreferencesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialPreferencesState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};
