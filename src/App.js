import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import AboutUsPage from "./pages/aboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/contactUsPage/ContactUsPage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Header from "./components/header/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/aboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "/contactUs",
        element: <ContactUsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/aboutUs",
    element: <AboutUsPage />,
  },
  {
    path: "/contactUs",
    element: <ContactUsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
