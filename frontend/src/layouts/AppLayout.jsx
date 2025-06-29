// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AccountDropdown from "../components/AccountDropdown";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f7f8fb] dark:bg-zinc-950 relative">
            <div className="fixed top-8 right-8 z-30">
                <AccountDropdown />
            </div>
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 flex flex-col px-4" style={{ paddingBottom: 70 }}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}