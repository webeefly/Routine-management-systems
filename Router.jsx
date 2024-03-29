import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import FacultyTable from "./Components/Faculty/FacultyTable";
import FacultyDetails from "./FacultyDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/all-faculties",
    element: <FacultyTable />,
  },
  {
    path: "/individual-faculty/:id",
    element: <FacultyDetails />,
  },
]);
