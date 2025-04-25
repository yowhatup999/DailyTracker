import React from "react";

import { Outlet, NavLink } from "react-router-dom";
import { Moon, Sun, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useState } from "react";


export default function MainLayout() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setDarkMode(!darkMode);
    };

    return (
        <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-xl p-6 flex flex-col justify-between">
                <div className="space-y-6">
                    <h1 className="text-xl font-bold tracking-tight text-center">DailyTracker</h1>

                    <nav className="flex flex-col gap-3 mt-10">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`
                            }
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`
                            }
                        >
                            <Settings className="w-5 h-5" />
                            Einstellungen
                        </NavLink>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center justify-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-lg text-sm hover:ring-2 hover:ring-blue-500 transition"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>

                    <button className="flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
}
