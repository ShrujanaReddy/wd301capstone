import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MatchesState, MatchesActions } from "./reducer";

const MatchesStateContext = createContext<MatchesState | undefined>(undefined);
const MatchesDispatchContext = createContext<React.Dispatch<MatchesActions> | undefined>(undefined);

export const useMatchesState = (): MatchesState => {
  const context = useContext(MatchesStateContext);
  if (context === undefined) {
    throw new Error("useMembersState must be used within a MembersProvider");
  }
  return context;
};

export const useMatchesDispatch = (): React.Dispatch<MatchesActions> => {
  const context = useContext(MatchesDispatchContext);
  if (context === undefined) {
    throw new Error("useMembersDispatch must be used within a MembersProvider");
  }
  return context;
};

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
