// src/components/statContent/StatContentSteps.jsx
import React, { useState } from "react";
import { patchDailyEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";
import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentSteps({ data, refresh, onLocalUpdate = () => {} }) {
    const { closeModal } = useModal();
    const [localSteps, setLocalSteps] = useState(data.value || 0);

    const handleUpdate = (newValue) => {
        setLocalSteps(newValue);
        onLocalUpdate({ type: "steps", value: newValue });
        patchDailyEntry(data.entryId, { schritte: newValue });
        setTimeout(() => {
            closeModal();
            if (refresh) refresh();
        }, 300);
    };

    const handleAdd = (amount) => handleUpdate(localSteps + amount);

    const handleCustomAdd = () => {
        const input = document.getElementById("steps-input").value;
        const value = parseInt(input);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        handleUpdate(localSteps + value);
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
                <InputField id="steps-input" type="number" placeholder="Eigene Zahl" />
                <AddButton onClick={handleCustomAdd}>Hinzufügen</AddButton>
            </div>
            <div className="text-right">
                <AddButton onClick={closeModal}>Schließen</AddButton>
            </div>
        </div>
    );
}