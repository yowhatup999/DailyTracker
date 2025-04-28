// src/pages/Dashboard.jsx
import React from "react";
import AnimatedBorder from "../components/AnimatedBorder";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
    // Platzhalter für Wetterdaten
    const weatherPlaceholder = "Sonnig, 25°C ☀️";
    const moonPlaceholder = "🌑 Neumond"; // später über API laden

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                {/* Begrüßung + Wetter */}
                <div className="flex flex-col justify-center items-center text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Willkommen zurück!
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {weatherPlaceholder} | {moonPlaceholder}
                    </p>
                </div>

                {/* Dashboard Inhalt */}
                <DashboardContent />
            </div>
        </AnimatedBorder>
    );
}
