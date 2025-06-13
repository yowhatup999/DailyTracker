// src/components/statContent/StatContentSupplement.jsx
import React, { useState } from "react";
import { patchSupplementEntry } from "../../services/api";

export default function StatContentSupplement({ data, refresh, onLocalUpdate = () => {} }) {
    const [genommen, setGenommen] = useState(data.genommen || false);

    const handleToggle = () => {
        const newStatus = !genommen;
        setGenommen(newStatus);
        onLocalUpdate({ type: "supplement", id: data.id, name: data.name, genommen: newStatus });
        patchSupplementEntry(data.id, { genommen: newStatus });
        setTimeout(() => {
            if (refresh) refresh();
        }, 300);
    };

    return (
        <div className="space-y-7 flex flex-col items-center justify-center py-2">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{data.name}</h2>
            <label className="flex flex-col items-center">
                <span className="mb-3 text-base text-zinc-500 font-medium tracking-tight">
                    Supplement genommen?
                </span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={genommen}
                    onClick={handleToggle}
                    className={`relative w-16 h-9 rounded-full transition-colors duration-300
                        ${genommen
                        ? "bg-green-500/90"
                        : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                    style={{
                        boxShadow: genommen
                            ? "0 2px 16px 0 rgba(34,197,94,0.20)"
                            : "0 1px 6px 0 rgba(0,0,0,0.05)"
                    }}
                >
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 left-1 transition-all duration-300 w-7 h-7 rounded-full bg-white shadow 
                        ${genommen ? "translate-x-7" : "translate-x-0"}`}
                    />
                </button>
                <span className={`mt-4 text-lg ${genommen ? "text-green-500 font-semibold" : "text-zinc-400"}`}>
                    {genommen ? "Genommen" : "Nicht genommen"}
                </span>
            </label>
        </div>
    );
}