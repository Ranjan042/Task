import { Navigate } from "react-router";
import { useEffect } from "react";
import {CartContext} from '../context/CartContext'
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {

    const user=useContext(CartContext);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;

};

export default ProtectedRoute;
