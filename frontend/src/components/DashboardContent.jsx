// src/components/DashboardContent.jsx
import React from "react";
import StatCard from "./StatCard";
import buildDashboardCards from "./DashboardCards";

export default function DashboardContent({ dashboard, overrides, onLocalUpdate }) {
    if (!dashboard)
        return <div className="text-center text-zinc-500">Lade Dashboard...</div>;

    const entry = {
        id: dashboard.id,
        schritte: overrides?.steps?.value ?? dashboard.schritte ?? 0,
        wasserMl: overrides?.water?.value ?? dashboard.wasserMl ?? 0,
        supplements: dashboard.supplements?.map(s => ({
            id: s.entryId ?? s.definitionId,
            name: s.name,
            mengeMg: s.mengeMg,
            genommen: s.genommen,
        })) ?? [],
        customEntries: dashboard.customs?.map(c => ({
            id: c.entryId ?? c.templateId,
            name: c.name,
            value: c.value ?? "",
            unit: c.unit,
        })) ?? [],
    };

    const cards = buildDashboardCards(entry, overrides ?? {});

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
}