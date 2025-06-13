// src/components/StatModal.jsx
import React from "react";
import { useModal } from "../context/ModalContext";
import AnimatedBorder from "./AnimatedBorder";
import StatContentSteps from "./statContent/StatContentSteps";
import StatContentWater from "./statContent/StatContentWater";
import StatContentSupplement from "./statContent/StatContentSupplement";
import StatContentCustom from "./statContent/StatContentCustom";

export default function StatModal({ refreshDashboard, onLocalUpdate }) {
    const { modalData, closeModal } = useModal();
    if (!modalData) return null;

    const refreshAndClose = async () => {
        if (refreshDashboard) await refreshDashboard();
        await new Promise((resolve) => setTimeout(resolve, 300));
        closeModal();
    };

    const commonProps = {
        data: modalData,
        refresh: refreshAndClose,
        onLocalUpdate: modalData?.onLocalUpdate || (() => {}),
    };

    const renderContent = () => {
        switch (modalData.type) {
            case "steps":
                return <StatContentSteps {...commonProps} />;
            case "water":
                return <StatContentWater {...commonProps} />;
            case "supplement":
                return <StatContentSupplement {...commonProps} />;
            case "custom":
                return <StatContentCustom {...commonProps} />;
            default:
                return <p>Unbekannter Typ</p>;
        }
    };

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target.id === "modal-backdrop" && closeModal()}
        >
            <div className="w-full max-w-md p-4">
                <AnimatedBorder>
                    <div className="glow-inner p-6 space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
                        {renderContent()}
                        <div className="mt-8 text-right">
                            <button
                                onClick={closeModal}
                                className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
                            >
                                Schließen
                            </button>
                        </div>
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}