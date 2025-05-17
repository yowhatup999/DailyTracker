// src/components/StatEntryModal.jsx
import React, { useState } from "react";
import AnimatedBorder from "./AnimatedBorder";
import { createCustomEntry, createSupplement } from "../services/api";

export default function StatEntryModal({ onClose, onCreated }) {
    const [mode, setMode] = useState(null);
    const [formData, setFormData] = useState({ name: "", unit: "", mengeMg: "" });

    const handleSubmit = async () => {
        try {
            if (mode === "supplement") {
                await createSupplement({ name: formData.name, mengeMg: formData.mengeMg });
            } else if (mode === "custom") {
                await createCustomEntry({ name: formData.name, unit: formData.unit });
            }
            onCreated();
            onClose();
        } catch (err) {
            alert("Fehler beim Erstellen. Bitte versuche es erneut.");
        }
    };

    const renderOptions = () => (
        <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">Was möchtest du hinzufügen?</h2>
            <div className="flex justify-center gap-4">
                <button onClick={() => setMode("supplement")} className="btn-blue">Supplement</button>
                <button onClick={() => setMode("custom")} className="btn-gray">Custom Entry</button>
            </div>
        </div>
    );

    const renderForm = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Neuen {mode === "supplement" ? "Supplement" : "Custom Entry"} erstellen</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full input"
            />
            {mode === "supplement" ? (
                <input
                    type="number"
                    placeholder="Menge in mg"
                    value={formData.mengeMg}
                    onChange={(e) => setFormData({ ...formData, mengeMg: e.target.value })}
                    className="w-full input"
                />
            ) : (
                <input
                    type="text"
                    placeholder="Einheit (z. B. ml, mg, Wiederholungen)"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full input"
                />
            )}
            <div className="flex justify-between pt-2">
                <button onClick={onClose} className="btn-gray">Abbrechen</button>
                <button onClick={handleSubmit} className="btn-blue">Speichern</button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-4">
                <AnimatedBorder>
                    <div className="glow-inner p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
                        {mode ? renderForm() : renderOptions()}
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}
