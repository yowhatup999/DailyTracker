// src/components/StatCard.jsx
import React from "react";
import { useModal } from "../context/ModalContext";

export default function StatCard({ title, value, description, highlight, onClickData, onCardClick }) {
    const { openModal } = useModal();

    const isAddCard = onClickData?.type === "create-entry";

    const handleClick = () => {
        if (isAddCard && onCardClick) return onCardClick(onClickData);
        if (onClickData) openModal(onClickData);
    };

    const colors = {
        green: "text-green-500",
        blue: "text-blue-500",
        purple: "text-purple-500",
        red: "text-red-500",
    };

    return (
        <div
            className={`rounded-2xl p-6 transition-all duration-200 cursor-pointer 
                ${isAddCard
                ? "bg-white/80 shadow-md hover:shadow-lg hover:scale-105 relative"
                : "shadow-soft dark:shadow-glow bg-card-light dark:bg-card-dark hover:scale-[1.02]"
            }`}
            onClick={handleClick}
        >
            {isAddCard ? (
                <span className="absolute bottom-2 left-3 text-gray-400 text-2xl">+</span>
            ) : (
                <>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-lg font-medium">{value}</p>
                    <p className={`text-sm ${colors[highlight]}`}>{description}</p>
                </>
            )}
        </div>
    );
}
