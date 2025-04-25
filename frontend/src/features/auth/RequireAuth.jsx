import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/UserContext.jsx";

export default function RequireAuth() {
    const { state } = useUser();

    if (!state.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
