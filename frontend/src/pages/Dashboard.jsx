// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AnimatedBorder from "../components/AnimatedBorder";
import TopBar from "../components/TopBar";
import DashboardWrapper from "./DashboardWrapper";
import { fetchWeatherAndMoon } from "../services/astroApi";

export default function Dashboard() {
    const isReady = useAuth();
    const [astroData, setAstroData] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("dailytracker_username");
        if (storedName) {
            setUsername(storedName);
        }

        // Wetterdaten mit 4h-Cache prüfen
        const cache = localStorage.getItem("dailytracker_astroData");
        const cacheTime = localStorage.getItem("dailytracker_astroData_time");
        const now = Date.now();

        if (cache && cacheTime && now - parseInt(cacheTime) < 4 * 60 * 60 * 1000) {
            setAstroData(JSON.parse(cache));
        } else {
            fetchWeatherAndMoon()
                .then(data => {
                    setAstroData(data);
                    localStorage.setItem("dailytracker_astroData", JSON.stringify(data));
                    localStorage.setItem("dailytracker_astroData_time", now.toString());
                })
                .catch(() => setAstroData(null));
        }
    }, []);

    if (!isReady) return null;

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                <TopBar
                    name={username}
                    weather={astroData?.weather}
                    moon={astroData?.moon}
                />
                <DashboardWrapper />
            </div>
        </AnimatedBorder>
    );
}