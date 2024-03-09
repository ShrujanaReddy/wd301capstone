import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MatchesState, MatchesActions } from "./reducer";

const MatchesStateContext = createContext<MatchesState | undefined>(undefined);
const MatchesDispatchContext = createContext<React.Dispatch<MatchesActions> | undefined>(undefined);

export const useMatchesState = () => useContext(MatchesStateContext)!;
export const useMatchesDispatch = () => useContext(MatchesDispatchContext)!;

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};
