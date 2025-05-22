// src/components/AddCustomEntryForm.jsx
import React, { useState } from "react";
import { getTodayDailyEntry, createCustomEntry } from "../services/api";

export default function AddCustomEntryForm() {
    const [type, setType] = useState("text"); // text, number, checkbox
    const [form, setForm] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: inputType === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const daily = await getTodayDailyEntry();
            let value = form.value;
            if (type === "checkbox") value = !!form.value;
            if (type === "number") value = Number(form.value);

            await createCustomEntry(daily.id, {
                name: form.name,
                value: value.toString(),
                unit: form.unit || "",
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
                    placeholder="z.B. Blutdruck"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Typ</label>
                <select
                    value={type}
                    onChange={e => { setType(e.target.value); setForm({ ...form, value: "" }); }}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                >
                    <option value="text">Text</option>
                    <option value="number">Zahl</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Wert</label>
                {type === "text" && (
                    <input
                        type="text"
                        name="value"
                        value={form.value || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    />
                )}
                {type === "number" && (
                    <input
                        type="number"
                        name="value"
                        value={form.value || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white"
                    />
                )}
                {type === "checkbox" && (
                    <input
                        type="checkbox"
                        name="value"
                        checked={!!form.value}
                        onChange={handleChange}
                        className="w-5 h-5 align-middle"
                    />
                )}
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