// src/pages/Settings.jsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AnimatedBorder from "../components/AnimatedBorder.jsx";

export default function Settings() {
    const { theme, setTheme } = useOutletContext() || {};
    const [password, setPassword] = useState("");
    const [language, setLanguage] = useState("de");
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <div className="mt-28">
                    <AnimatedBorder className="max-w-md mx-auto">
                        <div className="glow-inner p-8 space-y-8">
                            <h2 className="text-3xl font-semibold text-center text-zinc-900 dark:text-white">
                                Einstellungen
                            </h2>
                            <div className="space-y-8">
                                <div className="space-y-2 text-left">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Design Modus</label>
                                    <select
                                        value={theme}
                                        onChange={e => {
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
                                <div className="space-y-2 text-left">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Passwort ändern</label>
                                    <input
                                        type="password"
                                        placeholder="Neues Passwort"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white py-2 rounded-lg font-semibold transition">
                                        Passwort speichern
                                    </button>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Sprache</label>
                                    <select
                                        value={language}
                                        onChange={e => setLanguage(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="de">Deutsch</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Profilbild</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {profilePic && (
                                        <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                            {profilePic.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
                                        Account löschen
                                    </button>
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