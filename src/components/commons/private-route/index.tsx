import {  useNavigate } from "react-router";
import { useEffect } from "react";
import * as React from "react";

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        if (!authToken) {
            navigate("/", { replace: true });
        }
    }, [authToken, navigate]);

    return authToken ? element : null;
};

export default PrivateRoute;