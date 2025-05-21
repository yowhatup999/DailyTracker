// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AnimatedBorder from "../components/AnimatedBorder";
import TopBar from "../components/TopBar";
import DashboardWrapper from "./DashboardWrapper";
import { getDashboardInfo } from "../services/api";

export default function Dashboard() {
    const isReady = useAuth();
    const [astroData, setAstroData] = useState(null);

    useEffect(() => {
        getDashboardInfo()
            .then(data => setAstroData(data))
            .catch(err => {
                console.error("Fehler beim Laden von Dashboard-Infos", err);
                setAstroData(null);
            });
    }, []);

    if (!isReady || !astroData) return null;

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                <TopBar
                    name={astroData.username}
                    weather={astroData.weather}
                    moon={astroData.moon}
                />
                <DashboardWrapper />
            </div>
        </AnimatedBorder>
    );
}