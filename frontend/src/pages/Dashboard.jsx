// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AnimatedBorder from "../components/AnimatedBorder";
import TopBar from "../components/TopBar";
import DashboardWrapper from "./DashboardWrapper";
import { getDashboardInfo } from "../services/api";

const DEMO_DASHBOARD = {
    username: "Demo User",
    weather: null,
    moon: null,
};

export default function Dashboard() {
    const { isReady, isLoggedIn } = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [overrides, setOverrides] = useState({});
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        if (!isReady) return;
        getDashboardInfo()
            .then(data => {
                setDashboard(data);
                setOverrides({});
                setIsDemo(false);
            })
            .catch(() => {
                setDashboard(DEMO_DASHBOARD);
                setIsDemo(true);
            });
    }, [isReady, isLoggedIn]);

    const handleLocalUpdate = useCallback((payload) => {
        setOverrides(prev => ({
            ...prev,
            [`${payload.type}${payload.id ? `-${payload.id}` : ''}`]: payload,
        }));
    }, []);

    if (!isReady || !dashboard) return null;

    const DemoBanner = (
        <div className="w-full flex items-center justify-center">
            <div
                className="rounded-xl bg-white/90 dark:bg-zinc-900/80 px-8 py-4 mb-5 shadow text-center border border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-100 text-base"
                style={{
                    backdropFilter: "blur(10px)",
                    letterSpacing: "0.01em",
                    fontSize: "1.04rem",
                }}
            >
                <span role="img" aria-label="info" className="mr-2">🔒</span>
                <span>
                    Demo-Modus –{" "}
                    <Link
                        to="/login"
                        className="font-bold text-blue-600 hover:underline transition-all duration-200"
                        style={{
                            fontWeight: 600,
                            fontSize: "1.03em",
                            letterSpacing: "-0.01em"
                        }}
                    >
                        Bitte einloggen
                    </Link>
                    , um zu speichern &amp; alle Funktionen zu nutzen.
                </span>
            </div>
        </div>
    );

    return (
        <AnimatedBorder>
            <div className="w-full p-6 sm:p-10 space-y-10">
                {isDemo && DemoBanner}
                <TopBar
                    name={dashboard.username}
                    weather={dashboard.weather}
                    moon={dashboard.moon}
                />
                <DashboardWrapper
                    dashboard={dashboard}
                    overrides={overrides}
                    onLocalUpdate={handleLocalUpdate}
                    refresh={isDemo ? () => {} : undefined}
                    isDemo={isDemo}
                />
            </div>
        </AnimatedBorder>
    );
}