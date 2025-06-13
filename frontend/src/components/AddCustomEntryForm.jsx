// src/components/AddCustomEntryForm.jsx
import React, { useState } from "react";
import { createCustomDefinition } from "../services/api";

export default function AddCustomEntryForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await createCustomDefinition({
                name: form.name,
                unit: form.unit || "",
                enabled: true,
            });
            setMessage({ text: "Eintrag erfolgreich angelegt.", type: "success" });
            setForm({});
        } catch (err) {
            setMessage({ text: "Fehler beim Anlegen.", type: "error" });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={form.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    placeholder="z.B. Proteine"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Einheit</label>
                <input
                    type="text"
                    name="unit"
                    value={form.unit || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    placeholder="z.B. mmHg"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg font-semibold text-white"
            >
                {loading ? "Speichert..." : "Speichern"}
            </button>
            {message && (
                <div className={`mt-4 text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message.text}
                </div>
            )}
        </form>
    );
}