// src/components/statContent/StatContentWater.jsx
import React from "react";
import { patchDailyEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";

import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentWater({ data }) {
    const { closeModal } = useModal();

    const handleAddWater = async (amount) => {
        await patchDailyEntry(data.entryId, { wasserMl: data.value + amount });
        setTimeout(closeModal, 2000);
    };

    const handleCustomAdd = async () => {
        const input = document.getElementById("water-input").value;
        const value = parseInt(input);
        if (isNaN(value)) return alert("Ungültige Eingabe");
        await patchDailyEntry(data.entryId, { wasserMl: data.value + value });
        setTimeout(closeModal, 2000);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Wasserzufuhr</h2>
            <p className="text-sm text-zinc-500">Aktuell: {data.value} ml</p>
            <div className="flex gap-2">
                <AddButton onClick={() => handleAddWater(250)} className="btn-blue">+250ml</AddButton>
                <AddButton onClick={() => handleAddWater(500)} className="btn-blue">+500ml</AddButton>
                <AddButton onClick={() => handleAddWater(1000)} className="btn-blue">+1000ml</AddButton>
            </div>
            <div className="flex gap-2">
                <InputField id="water-input" type="number" placeholder="Eigene Zahl" className="input" />
                <AddButton onClick={handleCustomAdd} className="btn-blue">Hinzufügen</AddButton>
            </div>
        </div>
    );
}