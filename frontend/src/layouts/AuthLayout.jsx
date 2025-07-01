// src/layouts/AuthLayout.jsx
import React from "react";
import Footer from "../components/Footer";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f7f8fb] dark:bg-zinc-950">
            <div className="flex flex-1 items-center justify-center">
                {children}
            </div>
            <Footer />
        </div>
    );
}