// src/components/AddSupplementForm.jsx
import React, { useState } from "react";
import { createSupplementDefinition } from "../services/api.js";
import {useNotification} from "../context/NotificationContext.jsx";
import useAuth from "../hooks/useAuth.js";

export default function AddSupplementForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const { isLoggedIn } = useAuth();

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
            await createSupplementDefinition({
                name: form.name,
                mengeMg: form.mengeMg,
                enabled: true,
            });
            setMessage({ text: "Supplement erfolgreich angelegt.", type: "success" });
            setForm({});
        } catch (err) {
            setMessage({ text: "Fehler beim Anlegen.", type: "error" });
            if (!isLoggedIn) {
                showNotification("🔒 Demo-Modus – Bitte einloggen, um zu speichern & alle Funktionen zu nutzen.");
            } else {
                showNotification("Server nicht erreichbar oder unbekannter Fehler.");
            }
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