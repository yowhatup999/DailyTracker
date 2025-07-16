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
                        <div className="mt-10 flex justify-center">
                            <a
                                href="https://github.com/yowhatup999/DailyTracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white text-xs opacity-80 hover:opacity-100 transition"
                                style={{ textDecoration: "none" }}
                            >
                                <svg height="18" width="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M12 2C6.48 2 2 6.58 2 12.27c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.41-1.07-1-1.36-1-1.36-.82-.58.06-.57.06-.57.91.07 1.39.96 1.39.96.81 1.42 2.12 1.01 2.64.77.08-.6.32-1.01.57-1.24-2.22-.26-4.56-1.13-4.56-5 0-1.1.39-2 1.03-2.7-.1-.27-.45-1.34.1-2.79 0 0 .84-.28 2.76 1.03A9.31 9.31 0 0 1 12 6.91c.85.004 1.7.115 2.5.337 1.92-1.31 2.76-1.03 2.76-1.03.55 1.45.2 2.52.1 2.79.64.7 1.03 1.6 1.03 2.7 0 3.88-2.34 4.74-4.57 5 .33.29.62.86.62 1.74 0 1.25-.01 2.26-.01 2.57 0 .26.18.58.69.48A10.09 10.09 0 0 0 22 12.27C22 6.58 17.52 2 12 2Z"
                                    />
                                </svg>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}