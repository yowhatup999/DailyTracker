// src/components/AddEntryModalContent.jsx
import React, { useState } from "react";
import AddSupplementForm from "./AddSupplementForm.jsx";
import AddCustomEntryForm from "./AddCustomEntryForm.jsx";
import AddDailyEntryForm from "./AddDailyEntryForm.jsx";

export default function AddEntryModalContent({ onClose }) {
    const [entryType, setEntryType] = useState("supplement");

    const handleSaved = () => {
        if (onClose) onClose();
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                Neuen Eintrag hinzufügen
            </h3>
            <select
                value={entryType}
                onChange={e => setEntryType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white text-sm"
            >
                <option value="supplement">Supplement</option>
                <option value="custom">Custom Entry</option>
                <option value="daily">Daily Entry</option>
            </select>
            {entryType === "supplement" && <AddSupplementForm onSaved={handleSaved} compact />}
            {entryType === "custom" && <AddCustomEntryForm onSaved={handleSaved} compact />}
            {entryType === "daily" && <AddDailyEntryForm onSaved={handleSaved} compact />}
        </div>
    );
}