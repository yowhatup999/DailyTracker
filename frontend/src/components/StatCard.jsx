// src/components/StatCard.jsx
import React from "react";
import { useModal } from "../context/ModalContext.jsx";
import useAuth from "../hooks/useAuth.js";
import { useNotification } from "../context/NotificationContext.jsx";

export default function StatCard({
                                     title,
                                     value,
                                     description,
                                     highlight,
                                     onClickData,
                                     onCardClick,
                                     onLocalUpdate
                                 }) {
    const { openModal } = useModal();
    const { isLoggedIn } = useAuth();
    const { showNotification } = useNotification();
    const isAddCard = onClickData?.type === "create-entry";

    const handleClick = () => {
        if (isAddCard) {
            if (!isLoggedIn) {
                showNotification("🔒 Demo-Modus – Bitte einloggen! 🔒");
                return;
            }
            openModal({ ...onClickData, onLocalUpdate });
            return;
        }
        if (onClickData) openModal({ ...onClickData, onLocalUpdate });
    };

    const colors = {
        green: "text-green-500",
        blue: "text-blue-500",
        purple: "text-purple-500",
        red: "text-red-500",
    };

    return (
        <div
            className="stat-card-outer cursor-pointer"
            onClick={handleClick}
        >
            <div className={`stat-card-inner rounded-2xl p-6 transition-all duration-200
                ${isAddCard
                ? "bg-white/80 shadow-md hover:shadow-lg hover:scale-105 relative"
                : "shadow-soft dark:shadow-glow bg-card-light dark:bg-card-dark hover:scale-[1.02]"
            }`}
                 style={{ position: "relative", zIndex: 1 }}
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
        </div>
    );
}