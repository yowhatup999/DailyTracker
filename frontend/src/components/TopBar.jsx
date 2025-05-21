// src/components/TopBar.jsx
import React from "react";

export default function TopBar({ name, weather, moon }) {
    return (
        <div className="w-full px-6 py-5 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl rounded-2xl shadow-sm flex flex-col items-center gap-1">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
                {name ? `Willkommen zurück, ${name}!` : "Willkommen zurück!"}
            </h1>
            <div className="flex items-center gap-8 text-lg font-normal text-zinc-700 dark:text-zinc-200">
                {weather && (
                    <span className="flex items-center gap-2">
                        <span className="text-base font-medium">{weather.status}</span>
                        <span className="text-2xl">{weather.emoji}</span>
                        <span className="text-blue-500 font-medium">{weather.temperature}°C</span>
                    </span>
                )}
                {moon && (
                    <span className="flex items-center gap-2">
                        <span className="text-2xl">{moon.emoji}</span>
                        <span className="text-base font-medium">{moon.phase}</span>
                    </span>
                )}
            </div>
        </div>
    );
}