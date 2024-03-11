import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, ArticlesState, ArticlesActions } from "./reducer";

const ArticlesStateContext = createContext<ArticlesState | undefined>(undefined);
const ArticlesDispatchContext = createContext<React.Dispatch<ArticlesActions> | undefined>(undefined);

export const useArticlesState = (): ArticlesState => {
  const context = useContext(ArticlesStateContext);
  if (context === undefined) {
    throw new Error("useArticlesState must be used within an ArticlesProvider");
  }
  return context;
};

export const useArticlesDispatch = (): React.Dispatch<ArticlesActions> => {
  const context = useContext(ArticlesDispatchContext);
  if (context === undefined) {
    throw new Error("useArticlesDispatch must be used within an ArticlesProvider");
  }
  return context;
};

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};
