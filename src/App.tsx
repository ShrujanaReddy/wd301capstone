import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { MatchesProvider } from "./context/matches/context";

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-screen w-screen mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <MatchesProvider>
        <RouterProvider router={router} />
      </MatchesProvider>
    </div>
  );
}
export default App;