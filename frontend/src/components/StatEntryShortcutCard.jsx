// src/components/StatEntryShortcutCard.jsx
import React from "react";
import { useModal } from "../context/ModalContext.jsx";

export default function StatEntryShortcutCard() {
    const { openModal } = useModal();

    const handleClick = () => {
        openModal({
            type: "create-entry"
        });
    };

    return (
        <div
            className="stat-card-outer cursor-pointer"
            onClick={handleClick}
        >
            <div className="stat-card-inner rounded-2xl p-6 transition-all duration-200 bg-zinc-100 dark:bg-zinc-900 shadow-md hover:scale-105 hover:shadow-lg relative"
                 style={{ position: "relative", zIndex: 1 }}
            >
                <span className="absolute bottom-6 left-6 text-gray-400 text-4xl">+</span>
            </div>
        </div>
    );
}