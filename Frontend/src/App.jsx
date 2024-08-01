import ReactDOM from "react-dom/client";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Error from "./components/Error";
import Update from "./components/Update";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

export default App;
