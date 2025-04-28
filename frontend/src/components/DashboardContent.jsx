// src/components/DashboardContent.jsx
import React from "react";
import StatCard from "./StatCard";

// Später kommen die Daten per API Call!
const dummyStats = [
    { title: "Tägliche Schritte", value: "6.120 / 10.000", description: "Ziel fast erreicht", highlight: "green" },
    { title: "Wasserzufuhr", value: "1.200 ml", description: "Noch 800 ml bis zum Tagesziel", highlight: "blue" },
    { title: "Analyse", value: "72%", description: "Aufgaben heute abgeschlossen", highlight: "purple" },
    { title: "Vitamin D", value: "eingenommen", description: "Supplement heute genommen", highlight: "blue" },
    { title: "Magnesium", value: "nicht genommen", description: "Noch einnehmen!", highlight: "red" },
];

export default function DashboardContent() {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {dummyStats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                    highlight={stat.highlight}
                />
            ))}
        </div>
    );
}
