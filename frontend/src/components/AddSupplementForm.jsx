// src/components/AddSupplementForm.jsx
import React, { useState } from "react";
import { getTodayDailyEntry, createSupplementEntry } from "../services/api";

export default function AddSupplementForm() {
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
            const daily = await getTodayDailyEntry();
            await createSupplementEntry(daily.id, {
                ...form,
                genommen: false,
                datum: form.datum || new Date().toISOString().slice(0, 10)
            });
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
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={form.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    placeholder="z.B. Zink"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Menge (mg)</label>
                <input
                    type="number"
                    name="mengeMg"
                    required
                    value={form.mengeMg || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    placeholder="z.B. 30"
                    min="1"
                />
            </div>
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