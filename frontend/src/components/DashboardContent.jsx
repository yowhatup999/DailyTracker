// src/components/DashboardContent.jsx
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import StatCard from "./StatCard";
import { getTodayDailyEntry } from "../services/api";
import buildDashboardCards, { overrideKey } from "./DashboardCards";

const DashboardContent = forwardRef(({ onLocalUpdate, overrides }, ref) => {
    const [entry, setEntry] = useState(null);

    const fetchEntry = async () => {
        try {
            const response = await getTodayDailyEntry();
            setEntry(response);
        } catch (error) {
            console.error("Fehler beim Laden des DailyEntry:", error);
        }
    };

    useEffect(() => {
        fetchEntry();
    }, []);

    useImperativeHandle(ref, () => ({
        refresh: fetchEntry,
    }));

    if (!entry) return <div className="text-center text-zinc-500">Lade Tagesdaten...</div>;

    const cards = buildDashboardCards(entry, overrides);

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
                <StatCard
                    key={index}
                    {...card}
                    onLocalUpdate={onLocalUpdate}
                />
            ))}
        </div>
    );
});

export default DashboardContent;