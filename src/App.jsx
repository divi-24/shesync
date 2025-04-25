import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import { Signup } from "./components/Signup";

const router = createBrowserRouter([
  
  {
    path: "/Signup",
    element: <Signup />,
  },
 
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
