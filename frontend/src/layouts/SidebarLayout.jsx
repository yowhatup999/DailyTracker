// src/layouts/SidebarLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Menu, X } from "lucide-react";
import AccountDropdown from "../components/AccountDropdown";
import StatModal from "../components/StatModal";
import { useUser } from "../hooks/UserContext";

export default function SidebarLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
    const navigate = useNavigate();
    const { state } = useUser();

    useEffect(() => {
        const applyTheme = () => {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else if (theme === "light") {
                document.documentElement.classList.remove("dark");
            } else {
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        };
        applyTheme();
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = () => {
            if (theme === "system") applyTheme();
        };
        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, [theme]);

    useEffect(() => {
        const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClickTitle = () => {
        navigate("/");
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    const handleProtectedNav = (e, target) => {
        if (!state.isLoggedIn) {
            e.preventDefault();
            navigate("/login");
        } else {
            navigate(target);
        }
        setSidebarOpen(false);
    };

    return (
        <div className="flex w-full min-h-screen bg-brand-light dark:bg-brand-dark text-zinc-900 dark:text-white overflow-hidden">
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow-md lg:hidden"
                >
                    <Menu />
                </button>
            )}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                />
            )}

            <aside className={`h-screen w-64 flex flex-col fixed lg:static z-50 lg:z-10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg border-r border-zinc-200 dark:border-zinc-800 shadow-lg lg:shadow-none transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}>
                <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                    <h1
                        onClick={handleClickTitle}
                        className="font-bold text-xl cursor-pointer hover:text-blue-600 transition"
                    >
                        DailyTracker
                    </h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-1 px-4 py-4 text-sm font-medium">
                    <NavLink to="/dashboard" className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive
                                ? "bg-blue-500 text-white scale-105"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 text-zinc-700 dark:text-zinc-200"
                        }`
                    }>
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </NavLink>

                    <a
                        href="/add-entry"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 text-zinc-700 dark:text-zinc-200"
                        onClick={e => handleProtectedNav(e, "/add-entry")}
                    >
                        <span className="w-4 h-4">➕</span>
                        Neuer Eintrag
                    </a>

                    <a
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 text-zinc-700 dark:text-zinc-200"
                        onClick={e => handleProtectedNav(e, "/settings")}
                    >
                        <Settings className="w-4 h-4" />
                        Einstellungen
                    </a>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col min-h-screen overflow-y-auto p-6 lg:p-10 relative z-0">
                <div className="flex justify-end mb-6 relative z-50">
                    <AccountDropdown />
                </div>

                <Outlet context={{ theme, setTheme }} />

                <StatModal />
            </main>
        </div>
    );
}