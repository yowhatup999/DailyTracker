// src/components/AddDailyEntryForm.jsx
import React, { useState } from "react";
import { createDailyEntry } from "../services/api.js";

export default function AddDailyEntryForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await createDailyEntry(form);
            setMessage({ text: "Eintrag erfolgreich gespeichert.", type: "success" });
            setForm({});
        } catch (err) {
            setMessage({ text: "Fehler beim Speichern.", type: "error" });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
                <label className="block text-sm font-medium mb-1">Datum</label>
                <input
                    type="date"
                    name="datum"
                    required
                    value={form.datum || new Date().toISOString().slice(0, 10)}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Schritte</label>
                <input
                    type="number"
                    name="schritte"
                    value={form.schritte || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    min="0"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Schlaf (Stunden)</label>
                <input
                    type="number"
                    name="schlafStunden"
                    value={form.schlafStunden || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    min="0"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Wasser (ml)</label>
                <input
                    type="number"
                    name="wasserMl"
                    value={form.wasserMl || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    min="0"
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
                <div className={`mt-4 text-sm font-medium w-full text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message.text}
                </div>
            )}
        </form>
    );
}