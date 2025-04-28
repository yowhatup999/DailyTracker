// src/pages/Dashboard.jsx
import React from "react";
import StatCard from "../components/StatCard";
import AnimatedBorder from "../components/AnimatedBorder";

export default function Dashboard() {
    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                {/* Begrüßung */}
                <div className="flex flex-col justify-center items-center text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Montag, 01.01.2025 ☀️
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Sonnig, 25°C – Willkommen zurück!
                    </p>
                </div>

                {/* Statistik-Karten */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    <StatCard
                        title="Tägliche Schritte"
                        value="6.120 / 10.000"
                        description="Ziel fast erreicht"
                        highlight="green"
                    />
                    <StatCard
                        title="Wasserzufuhr"
                        value="1.200 ml"
                        description="Noch 800 ml bis zum Tagesziel"
                        highlight="blue"
                    />
                    <StatCard
                        title="Analyse"
                        value="72%"
                        description="Aufgaben heute abgeschlossen"
                        highlight="purple"
                    />
                    <StatCard
                        title="sss"
                        value="72%"
                        description="Aufgaben heute abgeschlossen"
                        highlight="blue"
                    />
                    <StatCard
                        title="test"
                        value="99%%"
                        description="Aufgaben heute abgeschlossen"
                        highlight="green"
                    />
                </div>
            </div>
        </AnimatedBorder>
    );
}
