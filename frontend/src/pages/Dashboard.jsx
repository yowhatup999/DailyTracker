// src/pages/Dashboard.jsx
import React from "react";
import useAuth from "../hooks/useAuth";
import AnimatedBorder from "../components/AnimatedBorder";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
    useAuth(); // schützt die Route

    const weatherPlaceholder = "Sonnig, 25°C ☀️";
    const moonPlaceholder = "🌑 Neumond";

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                <div className="flex flex-col justify-center items-center text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Willkommen zurück!</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {weatherPlaceholder} | {moonPlaceholder}
                    </p>
                </div>

                <DashboardContent />
            </div>
        </AnimatedBorder>
    );
}
