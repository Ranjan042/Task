import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
const router=createBrowserRouter([
    {
        path:"/",
        element:<h1>Home</h1>,
    },
    {
        path:"/login",
        element:<Login />,
    },
    {
        path:"/register",
        element:<Register />,
    }
]);

const AppRoute = () => {
    return (
      <RouterProvider router={router} />
    )
}

export default AppRoute;