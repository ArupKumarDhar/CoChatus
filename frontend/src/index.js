import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import firebaseConfig from "./firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Home from "./pages/home";
import Forgotpassword from "./pages/forgotpassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/registration",
    element: (
      <div>
        <Registration />
      </div>
    ),
  },
  {
    path: "/forgotpassword",
    element: (
      <div>
        <Forgotpassword />
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
