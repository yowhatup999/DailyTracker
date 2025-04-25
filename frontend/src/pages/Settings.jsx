import React from "react";

export default function Settings() {
    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg space-y-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-3xl font-semibold mb-4 text-zinc-900 dark:text-white">Einstellungen</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tägliches Schrittziel</label>
                <input
                    type="number"
                    placeholder="z. B. 10000"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tägliche Wasserzufuhr (ml)</label>
                <input
                    type="number"
                    placeholder="z. B. 2000"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Supplemente</label>
                <input
                    type="text"
                    placeholder="z. B. Zink, Magnesium, etc."
                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                Speichern
            </button>
        </div>
    );
}
