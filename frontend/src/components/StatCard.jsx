// src/components/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, description, highlight }) {
    const colors = {
        green: "text-green-500",
        blue: "text-blue-500",
        purple: "text-purple-500",
        red: "text-red-500",
    };

    return (
        <div className="rounded-2xl p-6 shadow-soft dark:shadow-glow bg-card-light dark:bg-card-dark hover:scale-[1.02] transition-all duration-200 space-y-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-lg font-medium">{value}</p>
            <p className={`text-sm ${colors[highlight]}`}>{description}</p>
        </div>
    );
}
