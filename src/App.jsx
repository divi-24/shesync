import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Landing } from "./components/Landing";
import { PeriodTracker } from "./components/PeriodTracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/tracker",
    element: <PeriodTracker />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
