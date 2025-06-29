// src/pages/Profile.jsx
import React from "react";
import AnimatedBorder from "../components/AnimatedBorder";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    const username = localStorage.getItem("dailytracker_username") || "";
    const email = localStorage.getItem("dailytracker_email") || "";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
                <AnimatedBorder>
                    <div className="glow-inner p-8 space-y-6 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-6">Profil</h1>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={username}
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none text-black dark:text-white"
                            />
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none text-black dark:text-white"
                            />
                            <input
                                type="password"
                                placeholder="Passwort ändern"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4 mt-6">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
                                Änderungen speichern
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}
