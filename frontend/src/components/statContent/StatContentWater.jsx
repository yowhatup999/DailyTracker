// src/components/statContent/StatContentWater.jsx
import React, { useState } from "react";
import { patchDailyEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";
import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentWater({ data, refresh, onLocalUpdate = () => {} }) {
    const { closeModal } = useModal();
    const [localWater, setLocalWater] = useState(data.value || 0);

    const handleUpdate = (newValue) => {
        setLocalWater(newValue);
        onLocalUpdate({ type: "water", value: newValue });
        patchDailyEntry(data.entryId, { wasserMl: newValue });
        setTimeout(() => {
            closeModal();
            if (refresh) refresh();
        }, 300);
    };

    const handleAdd = (amount) => handleUpdate(localWater + amount);

    const handleCustomAdd = () => {
        const input = document.getElementById("water-input").value;
        const value = parseInt(input);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        handleUpdate(localWater + value);
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
                <InputField id="water-input" type="number" placeholder="Eigene Zahl" className="input" />
                <AddButton onClick={handleCustomAdd} className="btn-blue">Hinzufügen</AddButton>
            </div>
            <div className="text-right">
                <AddButton onClick={closeModal}>Schließen</AddButton>
            </div>
        </div>
    );
}