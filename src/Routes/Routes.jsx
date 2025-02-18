import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../Components/ErrorPage";
import Root from "../Components/Root/Root";
import Home from "../Components/Home/Home";

import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddCredentials from "../Components/AddCredentials/AddCredentials";
import MyCredentialsList from "../Components/MyCredentialsList/MyCredentialsList";
import PrivateRoutes from "./PrivateRoutes";
import Update from "../Components/Update/Update";
import { SERVER_URL } from "../Constants/url";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addCredentials",
        element: (
          <PrivateRoutes>
            <AddCredentials></AddCredentials>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myCredentialsList",
        element: (
          <PrivateRoutes>
            <MyCredentialsList />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <Update></Update>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`${SERVER_URL}/selectedPlatform/${params.id}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
