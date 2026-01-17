import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AvailableFoods from "../Pages/Foods/AvailableFoods";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Pages/Profile/Profile";
import AddFood from "../Pages/Foods/AddFood";
import ManageMyFoods from "../Pages/Foods/ManageMyFoods";
import MyFoodRequests from "../Pages/Foods/MyFoodRequests";
import FoodDetails from "../Pages/Foods/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import FoodCard from "../components/FoodCard";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    // errorElement: Error404,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/availableFoods",
        Component: AvailableFoods,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/search-food",
        Component: FoodCard,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
      
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { 
    path: "/*", 
    element: <ErrorPage /> 
  },
]);
