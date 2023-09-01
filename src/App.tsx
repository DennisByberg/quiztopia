import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/game",
      element: <GamePage />,
    },
  ]);

  return (
    <section className={`App ${darkMode ? "App--dark" : "App--light"}`}>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
