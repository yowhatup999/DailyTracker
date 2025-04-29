// src/layouts/SidebarLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Menu, X } from "lucide-react";
import AccountDropdown from "../components/AccountDropdown";

export default function SidebarLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
    const navigate = useNavigate();

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
            if (theme === "system") {
                applyTheme();
            }
        };
        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, [theme]);

    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClickTitle = () => {
        navigate("/");
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
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
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden transition-opacity"
                />
            )}
            <aside className={`h-screen w-64 flex flex-col fixed lg:static z-50 lg:z-10 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-lg lg:shadow-none transition-transform duration-300 ${
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
                <nav className="flex-1 flex flex-col gap-2 px-4 py-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform ${
                                isActive
                                    ? "bg-blue-500 text-white scale-105"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105"
                            }`
                        }
                    >
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform ${
                                isActive
                                    ? "bg-blue-500 text-white scale-105"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105"
                            }`
                        }
                    >
                        <Settings />
                        <span>Einstellungen</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-h-screen overflow-y-auto p-6 lg:p-10">
                <div className="flex justify-end mb-6">
                    <AccountDropdown />
                </div>
                <Outlet context={{ theme, setTheme }} />
            </main>
        </div>
    );
}
