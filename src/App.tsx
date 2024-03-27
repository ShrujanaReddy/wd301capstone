import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <ArticlesProvider>
        <MatchesProvider>
          <PreferencesProvider>            
            <RouterProvider router={router} />
          </PreferencesProvider>
      </MatchesProvider>
      </ArticlesProvider>
    </div>
  );
}
export default App;