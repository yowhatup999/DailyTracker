import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext.jsx";

export default function SidebarLayout() {
    const { dispatch } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">DailyTracker</h2>
                    <nav className="flex flex-col gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "font-semibold text-blue-600" : "text-gray-700"
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive ? "font-semibold text-blue-600" : "text-gray-700"
                            }
                        >
                            Einstellungen
                        </NavLink>
                    </nav>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </aside>

            {/* Seiteninhalt */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}
