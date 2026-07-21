import { createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import About from "../Pages/About";
import ProductDetailPage from "../Pages/ProductDetailPage";
const router=createBrowserRouter([
    {
        path:"/",
        element:<ProtectedRoute><Home /></ProtectedRoute>,
    },

    {
        path:"/login",
        element:<Login />,
    },
    {
        path:"/register",
        element:<Register />,
    },
    {
        path:"/shop",
        element:<ProtectedRoute><Shop /></ProtectedRoute>,
    },
    {
        path:"/about",
        element:<ProtectedRoute><About /></ProtectedRoute>,
    },
    {
        path:"/product/:id",
        element:<ProtectedRoute><ProductDetailPage /></ProtectedRoute>,
    }
]);

const AppRoute = () => {

    return (
      <RouterProvider router={router} />
    )
}

export default AppRoute;