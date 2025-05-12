// src/context/DashboardContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getTodayDailyEntry } from "../services/api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDailyEntry = async () => {
        try {
            setLoading(true);
            const data = await getTodayDailyEntry();
            setEntry(data);
        } catch (err) {
            console.error("Fehler beim Laden des DailyEntry:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDailyEntry();
    }, []);

    return (
        <DashboardContext.Provider value={{ entry, loading, reload: loadDailyEntry }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);
