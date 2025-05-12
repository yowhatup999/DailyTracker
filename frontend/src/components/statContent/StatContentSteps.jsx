// src/components/statContent/StatContentSteps.jsx
import React from "react";
import { patchDailyEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";

import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentSteps({ data }) {
    const { closeModal } = useModal();

    const handleAddSteps = async (amount) => {
        await patchDailyEntry(data.entryId, { schritte: data.value + amount });
        setTimeout(closeModal, 2000);
    };

    const handleCustomAdd = async () => {
        const input = document.getElementById("steps-input").value;
        const value = parseInt(input);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        await patchDailyEntry(data.entryId, { schritte: data.value + value });
        setTimeout(closeModal, 2000);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Tägliche Schritte</h2>
            <p className="text-sm text-zinc-500">Aktuell: {data.value} Schritte</p>
            <div className="flex gap-2">
                <AddButton onClick={() => handleAddSteps(500)} className="btn-blue">+500</AddButton>
                <AddButton onClick={() => handleAddSteps(1000)} className="btn-blue">+1000</AddButton>
            </div>
            <div className="flex gap-2">
                <InputField id="steps-input" type="number" placeholder="Eigene Zahl" className="input" />
                <AddButton onClick={handleCustomAdd} className="btn-blue">Hinzufügen</AddButton>
            </div>
        </div>
    );
}