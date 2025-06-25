// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f7f8fb] dark:bg-zinc-950 relative">
            <main className="flex-1 flex flex-col px-4" style={{ paddingBottom: 70 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}