// src/components/StatModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../context/ModalContext.jsx";
import AnimatedBorder from "./AnimatedBorder.jsx";
import StatContentSteps from "./statContent/StatContentSteps.jsx";
import StatContentWater from "./statContent/StatContentWater.jsx";
import StatContentSupplement from "./statContent/StatContentSupplement.jsx";
import StatContentCustom from "./statContent/StatContentCustom.jsx";
import AddEntryModalContent from "./AddEntryModalContent.jsx";

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
            case "create-entry":
                return <AddEntryModalContent onClose={closeModal} />;
            default:
                return <p>Unbekannter Typ</p>;
        }
    };

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[3px] dark:bg-black/30"
            onClick={(e) => e.target.id === "modal-backdrop" && closeModal()}
        >
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="w-full max-w-md p-4"
                    >
                        <AnimatedBorder>
                            <div className="glow-inner p-6 space-y-6 bg-white/80 dark:bg-zinc-900/70 rounded-2xl shadow-lg backdrop-blur-md">
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

}