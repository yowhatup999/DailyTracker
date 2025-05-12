// src/components/StatModalWrapper.jsx
import React from "react";
import AnimatedBorder from "./AnimatedBorder";

export default function StatModalWrapper({ children, onClose }) {
    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            onClose();
        }
    };

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <AnimatedBorder>
                <div className="glow-inner w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
                    {children}
                </div>
            </AnimatedBorder>
        </div>
    );
}
