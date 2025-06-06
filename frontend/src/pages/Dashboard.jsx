// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import AnimatedBorder from "../components/AnimatedBorder";
import TopBar from "../components/TopBar";
import DashboardWrapper from "./DashboardWrapper";
import { getDashboardInfo } from "../services/api";

export default function Dashboard() {
    const isReady = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [overrides, setOverrides] = useState({});

    const fetchDashboard = useCallback(() => {
        getDashboardInfo()
            .then(data => {
                setDashboard(data);
                setOverrides({});
            })
            .catch(err => {
                console.error("Fehler beim Laden von Dashboard-Infos", err);
                setDashboard(null);
            });
    }, []);

    useEffect(() => {
        if (!isReady) return;
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [isReady, fetchDashboard]);

    const handleLocalUpdate = useCallback((payload) => {
        setOverrides(prev => ({
            ...prev,
            [`${payload.type}${payload.id ? `-${payload.id}` : ''}`]: payload,
        }));
    }, []);

    if (!isReady || !dashboard) return null;

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                <TopBar
                    name={dashboard.username}
                    weather={dashboard.weather}
                    moon={dashboard.moon}
                />
                <DashboardWrapper
                    dashboardData={dashboard}
                    overrides={overrides}
                    onLocalUpdate={handleLocalUpdate}
                    refresh={fetchDashboard}
                />
            </div>
        </AnimatedBorder>
    );
}