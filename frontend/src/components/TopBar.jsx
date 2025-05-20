// src/components/TopBar.jsx
import React, { useEffect, useState } from "react";
import { getDashboardInfo } from "../services/api";

export default function TopBar() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getDashboardInfo()
            .then(setData)
            .catch((err) => console.error("Fehler beim Dashboard-Info:", err));
    }, []);

    return (
        <div className="w-full text-center px-6 py-5 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                {data?.username ? `Willkommen zurück, ${data.username}!` : "Willkommen zurück!"}
            </h1>

            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 flex justify-center gap-4">
                {data?.weather && (
                    <span title={data.weather.status}>
                        {data.weather.emoji}{" "}
                        <span className="text-blue-500">{data.weather.temperature}°C</span>
                    </span>
                )}
                {data?.moon && (
                    <span title={data.moon.phase}>
                        {data.moon.emoji} {data.moon.phase}
                    </span>
                )}
            </div>
        </div>
    );
}