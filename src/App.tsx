import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
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
    <section className="App">
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
