// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useUser } from "../hooks/UserContext.jsx";

export default function Sidebar({ mobileOpen = false, setMobileOpen = () => {} }) {
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

    const handleProtectedNav = (e, target) => {
        if (!state.isLoggedIn) {
            e.preventDefault();
            navigate("/login");
        } else {
            navigate(target);
            setMobileOpen(false);
        }
    };

    const handleSignOut = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/login");
        setMobileOpen(false);
    };

    const sidebarClasses = `
        h-screen w-64 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-lg p-4 transition-all duration-300 z-40
        fixed top-0 left-0
        ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        md:static md:translate-x-0 md:opacity-100 md:flex
    `;

    return (
        <aside className={sidebarClasses}>
            <h1
                className="font-bold text-2xl cursor-pointer hover:text-blue-600 transition mb-8 text-zinc-900 dark:text-white"
                onClick={() => {
                    navigate("/");
                    setMobileOpen(false);
                }}
            >
                DailyTracker
            </h1>
            <nav className="flex-1 flex flex-col gap-3 text-base font-medium">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                                ? "bg-blue-500 text-white shadow-md"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow text-zinc-900 dark:text-white"
                        }`
                    }
                    onClick={() => setMobileOpen(false)}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/add-entry"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                                ? "bg-blue-500 text-white shadow-md"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow text-zinc-900 dark:text-white"
                        }`
                    }
                    onClick={e => handleProtectedNav(e, "/add-entry")}
                >
                    <span className="w-5 h-5">➕</span>
                    Neuer Eintrag
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                                ? "bg-blue-500 text-white shadow-md"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow text-zinc-900 dark:text-white"
                        }`
                    }
                    onClick={e => handleProtectedNav(e, "/settings")}
                >
                    <Settings className="w-5 h-5" />
                    Einstellungen
                </NavLink>
            </nav>
            <button
                onClick={handleSignOut}
                className="flex items-center gap-3 mt-10 px-4 py-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/70 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white text-zinc-900 dark:text-white font-semibold transition shadow"
            >
                <LogOut className="w-5 h-5" />
                Signout
            </button>
        </aside>
    );
}