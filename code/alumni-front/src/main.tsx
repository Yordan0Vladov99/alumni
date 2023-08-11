import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root/Root.tsx";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import HomePage from "./components/Homepage/Homepage.tsx";
import Checkout from "./components/Checkout/Checkout.tsx";
import Group from "./components/Group/Group.tsx";
import UserPage from "./components/UserPage/UserPage.tsx";
import Notifications from "./components/Notifications/Notifications.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "registration",
        element: localStorage.getItem("email") ? (
          <Navigate replace to="/" />
        ) : (
          <Register />
        ),
      },
      {
        path: "login",
        element: localStorage.getItem("email") ? (
          <Navigate replace to="/" />
        ) : (
          <Login />
        ),
      },
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "group/:groupId",
        element: <Group />,
      },
      {
        path: "user/:userId",
        element: <UserPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
