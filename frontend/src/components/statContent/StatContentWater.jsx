// src/components/statContent/StatContentWater.jsx
import React, { useState } from "react";
import { patchDailyEntry } from "../../services/api.js";
import AddButton from "../ui/AddButton.jsx";
import InputField from "../ui/InputField.jsx";

export default function StatContentWater({ data, refresh, onLocalUpdate = () => {}, isDemo }) {
    const [localWater, setLocalWater] = useState(data.value || 0);
    const [customValue, setCustomValue] = useState("");

    const handleUpdate = (newValue) => {
        setLocalWater(newValue);
        onLocalUpdate({ type: "water", value: newValue });
        if (!isDemo) {
            patchDailyEntry(data.entryId, { wasserMl: newValue });
            setTimeout(() => {
                if (refresh) refresh();
            }, 300);
        }
    };

    const handleAdd = (amount) => handleUpdate(localWater + amount);

    const handleCustomAdd = () => {
        const value = parseInt(customValue);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        handleUpdate(localWater + value);
        setCustomValue("");
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Wasserzufuhr</h2>
            <p className="text-sm text-zinc-500">Aktuell: {localWater} ml</p>
            <div className="flex gap-2">
                <AddButton onClick={() => handleAdd(250)} className="btn-blue">+250ml</AddButton>
                <AddButton onClick={() => handleAdd(500)} className="btn-blue">+500ml</AddButton>
                <AddButton onClick={() => handleAdd(1000)} className="btn-blue">+1000ml</AddButton>
            </div>
            <div className="flex gap-2">
                <InputField
                    type="number"
                    placeholder="Eigene Zahl"
                    value={customValue}
                    onChange={e => setCustomValue(e.target.value)}
                    className="input"
                />
                <AddButton onClick={handleCustomAdd} className="btn-blue">Hinzufügen</AddButton>
            </div>
        </div>
    );
}