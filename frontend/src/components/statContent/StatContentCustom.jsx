import React, { useState } from "react";
import { patchCustomEntry } from "../../services/api";

import AddButton from "../ui/AddButton";
import InputField from "../ui/InputField";

export default function StatContentCustom({ modalData, refresh }) {
    const [inputValue, setInputValue] = useState(modalData.value || "");

    const handleSave = async () => {
        await patchCustomEntry(modalData.id, { value: inputValue });
        refresh();
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{modalData.name}</h2>
            <div className="flex items-center gap-2">
                <InputField
                    type="text"
                    className="w-full px-4 py-2 border rounded"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {modalData.unit && <span className="text-zinc-500">{modalData.unit}</span>}
            </div>
            <AddButton
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
            >
                Speichern
            </AddButton>
        </div>
    );
}
