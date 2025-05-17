// src/components/statContent/StatContentSupplement.jsx
import React, { useState } from "react";
import { patchSupplementEntry } from "../../services/api";
import { useModal } from "../../context/ModalContext";
import AddButton from "../ui/AddButton";

export default function StatContentSupplement({ data, refresh, onLocalUpdate }) {
    const { closeModal } = useModal();
    const [genommen, setGenommen] = useState(data.genommen || false);

    const handleToggle = async () => {
        const newStatus = !genommen;
        setGenommen(newStatus);

        onLocalUpdate?.({
            type: "supplement",
            id: data.id,
            name: data.name,
            genommen: newStatus,
        });

        await patchSupplementEntry(data.id, { genommen: newStatus });

        setTimeout(() => {
            refresh();
        }, 500);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <p className="text-sm text-zinc-500">
                {genommen ? "bereits eingenommen" : "noch nicht genommen"}
            </p>
            <div className="flex items-center gap-4">
                <input
                    id="supplement-checkbox"
                    type="checkbox"
                    checked={genommen}
                    onChange={handleToggle}
                    className="w-5 h-5"
                />
                <label htmlFor="supplement-checkbox" className="text-sm">
                    Als genommen markieren
                </label>
            </div>
            <div className="text-right">
                <AddButton onClick={closeModal} className="btn-gray">
                    Schließen
                </AddButton>
            </div>
        </div>
    );
}
