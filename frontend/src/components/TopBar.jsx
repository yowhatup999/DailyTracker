// src/components/TopBar.jsx
import React from "react";

export default function TopBar({ name, weather, moon }) {
    return (
        <div className="w-full text-center px-6 py-5 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                {name ? `Willkommen zurück, ${name}!` : "Willkommen zurück!"}
            </h1>

            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 flex justify-center gap-4">
                {weather && (
                    <span title={weather.status}>
                        {weather.emoji}{" "}
                        <span className="text-blue-500">{weather.temperature}°C</span>
                    </span>
                )}
                {moon && (
                    <span title={moon.phase}>
                        {moon.emoji} {moon.phase}
                    </span>
                )}
            </div>
        </div>
    );
}