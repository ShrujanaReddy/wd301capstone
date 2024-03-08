import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes"
import { ThemeContext } from "./context/theme";

const App = () => {
  const currentTheme = useContext(ThemeContext)

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;