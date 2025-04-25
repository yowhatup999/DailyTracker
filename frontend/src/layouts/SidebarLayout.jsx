import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    Moon,
    Sun
} from "lucide-react";

export default function SidebarLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dark, setDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        const html = document.documentElement;
        html.classList.toggle("dark");
        setDark(html.classList.contains("dark"));
    };

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Sidebar */}
            <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col`}>
                <div className="p-4 flex items-center justify-between">
                    <h1 className={`font-bold text-xl transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}>DailyTracker</h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-2 px-4 py-2">
                    <NavLink to="/" className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`
                    }>
                        <LayoutDashboard />
                        {sidebarOpen && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink to="/settings" className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`
                    }>
                        <Settings />
                        {sidebarOpen && <span>Einstellungen</span>}
                    </NavLink>
                </nav>

                <div className="p-4 flex flex-col gap-3">
                    <button onClick={toggleDarkMode} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition">
                        {dark ? <Sun /> : <Moon />}
                        {sidebarOpen && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
                    </button>

                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition">
                        <LogOut />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
