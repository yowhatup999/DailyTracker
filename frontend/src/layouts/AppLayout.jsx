// src/layouts/AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AccountDropdown from "../components/AccountDropdown";

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#f7f8fb] dark:bg-zinc-950 relative">
            <button
                className="md:hidden fixed top-5 left-5 z-40 p-2 rounded-lg bg-white dark:bg-zinc-800 shadow"
                onClick={() => setSidebarOpen(true)}
                aria-label="Sidebar öffnen"
            >
                <div className="w-6 h-1 bg-zinc-700 mb-1 rounded"></div>
                <div className="w-6 h-1 bg-zinc-700 mb-1 rounded"></div>
                <div className="w-6 h-1 bg-zinc-700 rounded"></div>
            </button>

            <div className="fixed top-8 right-8 z-30">
                <AccountDropdown />
            </div>
            <div className="flex flex-1">
                <Sidebar
                    mobileOpen={sidebarOpen}
                    setMobileOpen={setSidebarOpen}
                />
                <main className="flex-1 flex flex-col px-4" style={{ paddingBottom: 70 }}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}