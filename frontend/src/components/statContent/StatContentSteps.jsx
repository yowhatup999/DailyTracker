// src/components/statContent/StatContentSteps.jsx
import React, { useState } from "react";
import { patchDailyEntry } from "../../services/api";
import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentSteps({ data, refresh, onLocalUpdate = () => {} }) {
    const [localSteps, setLocalSteps] = useState(data.value || 0);
    const [customValue, setCustomValue] = useState("");

    const handleUpdate = (newValue) => {
        setLocalSteps(newValue);
        onLocalUpdate({ type: "steps", value: newValue });
        patchDailyEntry(data.entryId, { schritte: newValue });
        setTimeout(() => {
            if (refresh) refresh();
        }, 300);
    };

    const handleAdd = (amount) => handleUpdate(localSteps + amount);

    const handleCustomAdd = () => {
        const value = parseInt(customValue);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        handleUpdate(localSteps + value);
        setCustomValue(""); // Reset input
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Tägliche Schritte</h2>
            <p className="text-sm text-zinc-500">Aktuell: {localSteps} Schritte</p>
            <div className="flex gap-2">
                <AddButton onClick={() => handleAdd(500)}>+500</AddButton>
                <AddButton onClick={() => handleAdd(1000)}>+1000</AddButton>
            </div>
            <div className="flex gap-2">
                <InputField
                    type="number"
                    placeholder="Eigene Zahl"
                    value={customValue}
                    onChange={e => setCustomValue(e.target.value)}
                    className="input"
                />
                <AddButton onClick={handleCustomAdd}>Hinzufügen</AddButton>
            </div>
        </div>
    );
}