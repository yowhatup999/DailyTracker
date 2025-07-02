// src/pages/Settings.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";
import AnimatedBorder from "../components/AnimatedBorder.jsx";

export default function Settings() {
    const { theme, setTheme } = useOutletContext() || {};

    return (
        <div className="flex justify-center pt-20 pb-10 min-h-screen px-4">
            <div className="w-full max-w-md">
                <AnimatedBorder>
                    <div className="glow-inner p-8 space-y-8">
                        <h2 className="text-3xl font-semibold text-center text-zinc-900 dark:text-white">
                            Einstellungen
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Design Modus</label>
                                <select
                                    value={theme}
                                    onChange={(e) => {
                                        setTheme(e.target.value);
                                        localStorage.setItem("theme", e.target.value);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="system">System-Einstellung</option>
                                    <option value="light">Hell</option>
                                    <option value="dark">Dunkel</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tägliches Schrittziel</label>
                                <input
                                    type="number"
                                    placeholder="z. B. 10000"
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                                Speichern
                            </button>
                        </div>
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}
