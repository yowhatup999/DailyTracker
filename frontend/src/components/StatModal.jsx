// src/components/StatModal.jsx
import React from "react";
import { useModal } from "../context/ModalContext";

export default function StatModal() {
    const { modalData, closeModal } = useModal();

    if (!modalData) return null;

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            closeModal();
        }
    };

    const renderContent = () => {
        switch (modalData.type) {
            case "steps":
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Schritte hinzufügen</h2>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => alert("+500 Schritte senden") /* TODO */}
                        >
                            + 500 Schritte
                        </button>
                    </div>
                );
            case "water":
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Wasser hinzufügen</h2>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => alert("+250ml Wasser senden") /* TODO */}
                        >
                            + 250 ml Wasser
                        </button>
                    </div>
                );
            case "supplement":
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{modalData.name}</h2>
                        <p>Menge: {modalData.mengeMg} mg</p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => alert("Supplement als genommen markieren") /* TODO */}
                        >
                            Als genommen markieren
                        </button>
                    </div>
                );
            case "custom":
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{modalData.name}</h2>
                        <input
                            type="text"
                            placeholder="Wert eingeben"
                            defaultValue={modalData.value}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => alert("CustomEntry speichern") /* TODO */}
                        >
                            Speichern
                        </button>
                    </div>
                );
            default:
                return <p>Unbekannter Typ</p>;
        }
    };

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-lg">
                {renderContent()}
                <div className="mt-6 text-right">
                    <button
                        onClick={closeModal}
                        className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
}