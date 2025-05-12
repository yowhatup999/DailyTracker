// src/components/statContent/StatContentCustom.jsx
import React, { useState } from "react";
import { patchCustomEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";

import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentCustom({ data }) {
    const { closeModal } = useModal();
    const [value, setValue] = useState(data.value || "");

    const handleSave = async () => {
        if (!value.trim()) return alert("Feld darf nicht leer sein");
        await patchCustomEntry(data.id, { value });
        setTimeout(closeModal, 2000);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <InputField
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Wert eingeben (${data.unit || 'z. B. mg'})`}
                className="input"
            />
            <AddButton onClick={handleSave} className="btn-blue">
                Speichern
            </AddButton>
        </div>
    );
}