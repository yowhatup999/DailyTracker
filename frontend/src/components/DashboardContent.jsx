// src/components/DashboardContent.jsx
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import StatCard from "./StatCard";
import { getTodayDailyEntry } from "../services/api";

const DashboardContent = forwardRef((props, ref) => {
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

    const handleLocalUpdate = (type, payload) => {
        setEntry((prev) => {
            if (!prev) return prev;
            const updated = { ...prev };

            if (type === "steps") {
                updated.schritte += payload.amount;
            } else if (type === "water") {
                updated.wasserMl += payload.amount;
            } else if (type === "supplement") {
                updated.supplements = updated.supplements.map((s) =>
                    s.id === payload.id ? { ...s, genommen: payload.genommen } : s
                );
            } else if (type === "custom") {
                updated.customEntries = updated.customEntries.map((c) =>
                    c.id === payload.id ? { ...c, value: payload.value } : c
                );
            }

            return updated;
        });
    };

    if (!entry) return <div className="text-center text-zinc-500">Lade Tagesdaten...</div>;

    const cards = [];

    const addCard = (title, value, description, highlight, onClickData) => {
        cards.push({ title, value, description, highlight, onClickData });
    };

    if (entry.schritte !== null) {
        addCard(
            "Tägliche Schritte",
            `${entry.schritte} Schritte`,
            "Schrittziel des Tages",
            "green",
            { type: "steps", entryId: entry.id, value: entry.schritte }
        );
    }

    if (entry.wasserMl !== null) {
        addCard(
            "Wasserzufuhr",
            `${entry.wasserMl} ml`,
            "Wasser heute",
            "blue",
            { type: "water", entryId: entry.id, value: entry.wasserMl }
        );
    }

    entry.supplements?.forEach((supp) => {
        addCard(
            supp.name,
            supp.genommen ? "eingenommen" : "nicht genommen",
            `${supp.mengeMg} mg`,
            supp.genommen ? "blue" : "red",
            { type: "supplement", id: supp.id, name: supp.name, genommen: supp.genommen }
        );
    });

    entry.customEntries?.forEach((custom) => {
        addCard(
            custom.name,
            `${custom.value} ${custom.unit || ""}`.trim(),
            "Benutzerdefinierter Eintrag",
            "purple",
            {
                type: "custom",
                id: custom.id,
                name: custom.name,
                value: custom.value,
                unit: custom.unit,
            }
        );
    });

    cards.push({
        isAddCard: true,
        isEmpty:
            (entry.supplements?.length ?? 0) + (entry.customEntries?.length ?? 0) === 0,
        onClickData: { type: "create-entry" },
    });

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
});

export default DashboardContent;
