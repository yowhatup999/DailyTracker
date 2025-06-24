import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext.jsx";

export default function RedirectIfLoggedIn({ children }) {
    const { state } = useUser();

    if (state.isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}