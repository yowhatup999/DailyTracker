// src/components/statContent/StatContentCustom.jsx
import React, { useState } from "react";
import { patchCustomEntry } from "../../services/api.js";
import InputField from "../ui/InputField.jsx";
import AddButton from "../ui/AddButton.jsx";

export default function StatContentCustom({ data, refresh, onLocalUpdate = () => {} }) {
    const [value, setValue] = useState(data.value || "");

    const handleSave = async () => {
        if (!value.trim()) return alert("Feld darf nicht leer sein");
        onLocalUpdate({ type: "custom", id: data.id, name: data.name, value, unit: data.unit });
        patchCustomEntry(data.id, { value });
        setTimeout(() => {
            if (refresh) refresh();
        }, 300);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <InputField
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={`Wert eingeben (${data.unit || "z. B. mg"})`}
                className="input"
            />
            <div className="flex justify-end">
                <AddButton onClick={handleSave} className="btn-blue">
                    Speichern
                </AddButton>
            </div>
        </div>
    );
}