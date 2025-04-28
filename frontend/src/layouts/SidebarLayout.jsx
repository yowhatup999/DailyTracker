// src/layouts/SidebarLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, LogOut, Menu, X } from "lucide-react";

export default function SidebarLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex w-full min-h-screen bg-brand-light dark:bg-brand-dark text-zinc-900 dark:text-white overflow-hidden">
            {/* Mobile Button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow-md lg:hidden"
                >
                    <Menu />
                </button>
            )}

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden transition-opacity"
                />
            )}

            {/* Sidebar */}
            <aside className={`h-screen w-64 flex flex-col fixed lg:static z-50 lg:z-10 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-lg lg:shadow-none transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}>
                <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                    <h1 className="font-bold text-xl">DailyTracker</h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-2 px-4 py-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                                isActive
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            }`
                        }
                    >
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                                isActive
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            }`
                        }
                    >
                        <Settings />
                        <span>Einstellungen</span>
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition w-full"
                    >
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-y-auto p-6 lg:p-10">
                <Outlet />
            </main>
        </div>
    );
}
