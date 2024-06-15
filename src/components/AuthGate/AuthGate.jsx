import { Navigate, Outlet } from "react-router-dom";
export const AuthGate = () => {
    const loggedIn = localStorage.getItem("loggedIn");

    return (
        loggedIn ? <Outlet /> : <Navigate to="/" />
    );
}