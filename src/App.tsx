import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return (
    <section className={`App ${darkMode ? "App--dark" : "App--light"}`}>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
