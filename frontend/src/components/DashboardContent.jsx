// src/components/DashboardContent.jsx
import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { getTodayDailyEntry } from "../services/api";

export default function DashboardContent() {
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await getTodayDailyEntry();
                setEntry(response);
            } catch (error) {
                console.error("Fehler beim Laden des DailyEntry:", error);
            }
        };
        fetchEntry();
    }, []);

    if (!entry) return <div className="text-center text-zinc-500">Lade Tagesdaten...</div>;

    const cards = [];

    // Schritte
    if (entry.schritte !== null) {
        cards.push({
            title: "Tägliche Schritte",
            value: `${entry.schritte} / 10000`,
            description: "Schrittziel des Tages",
            highlight: "green",
            onClickData: { type: "steps", entryId: entry.id, value: entry.schritte },
        });
    }

    // Wasser
    if (entry.wasserMl !== null) {
        cards.push({
            title: "Wasserzufuhr",
            value: `${entry.wasserMl} ml`,
            description: "Wasser heute",
            highlight: "blue",
            onClickData: { type: "water", entryId: entry.id, value: entry.wasserMl },
        });
    }

    // Supplements
    if (entry.supplements && entry.supplements.length > 0) {
        entry.supplements.forEach((supp) => {
            cards.push({
                title: supp.name,
                value: supp.genommen ? "eingenommen" : "nicht genommen",
                description: `${supp.mengeMg} mg`,
                highlight: supp.genommen ? "blue" : "red",
                onClickData: { type: "supplement", id: supp.id, name: supp.name, genommen: supp.genommen },
            });
        });
    }

    // Custom Entries
    if (entry.customEntries && entry.customEntries.length > 0) {
        entry.customEntries.forEach((custom) => {
            cards.push({
                title: custom.name,
                value: `${custom.value} ${custom.unit || ""}`,
                description: "Benutzerdefinierter Eintrag",
                highlight: "purple",
                onClickData: { type: "custom", id: custom.id, name: custom.name, value: custom.value, unit: custom.unit },
            });
        });
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
                <StatCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    description={card.description}
                    highlight={card.highlight}
                    onClickData={card.onClickData}
                />
            ))}
        </div>
    );
}
