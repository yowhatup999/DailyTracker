// src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
    return (
        <div className="p-8 space-y-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white min-h-screen transition-colors duration-300">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Willkommen zurück! <span className="text-3xl">👋</span></h1>
                <p className="text-zinc-600 dark:text-zinc-400">Automatisiere deinen Alltag und verfolge deine Fortschritte.</p>
            </div>
.
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Tägliche Schritte</h2>
                    <p className="text-lg font-medium">6.120 / 10.000</p>
                    <p className="text-sm text-green-500">Ziel fast erreicht</p>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Wasserzufuhr</h2>
                    <p className="text-lg font-medium">1.200 ml</p>
                    <p className="text-sm text-blue-500">Noch 800 ml bis zum Tagesziel</p>
                </div>

                <div className="bg-green-600 text-green-300 p-4 rounded-xl shadow-lg text-center">
                    ✅ Tailwind funktioniert! ????? ja?
                </div>


                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Analyse</h2>
                    <p className="text-lg font-medium">72%</p>
                    <p className="text-sm text-purple-500">Aufgaben heute abgeschlossen</p>
                </div>
            </div>
        </div>

    );
}
