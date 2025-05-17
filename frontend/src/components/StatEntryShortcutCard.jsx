// src/components/StatEntryShortcutCard.jsx
import React from "react";
import { useModal } from "../context/ModalContext";
import { Plus } from "lucide-react"; // Optional: Lucide Icon für modernes +

export default function StatEntryShortcutCard({ hasEntries }) {
    const { openModal } = useModal();

    const handleClick = () => {
        openModal({ type: "entryShortcut" });
    };

    return (
        <div
            onClick={handleClick}
            className="relative rounded-2xl p-6 bg-white/80 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center text-center min-h-[120px]"
        >
            {hasEntries ? (
                <Plus className="absolute bottom-2 left-2 text-gray-400 text-xl" />
            ) : (
                <p className="text-sm text-gray-500">
                    Hinzufügen <br />
                </p>
            )}
        </div>
    );
}
