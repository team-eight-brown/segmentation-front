import { Navigate } from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {useEffect} from "react";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};