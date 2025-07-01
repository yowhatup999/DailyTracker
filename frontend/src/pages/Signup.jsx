// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBorder from "../components/AnimatedBorder";
import { registerUser } from "../services/api";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            setMessage({ text: "Registrierung erfolgreich!", type: "success" });
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            setMessage({ text: "Registrierung fehlgeschlagen!", type: "error" });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-brand-light dark:bg-brand-dark px-4">
            <div className="w-full max-w-4xl">
                <AnimatedBorder>
                    <div className="glow-inner px-20 py-12 space-y-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Registrieren</h1>
                        <div className="mx-auto max-w-xl">
                            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6 text-left">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">E-Mail</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-base text-black dark:text-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">Passwort</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-base text-black dark:text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold text-white"
                                >
                                    Registrieren
                                </button>
                                {message && (
                                    <div className={`mt-3 text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {message.text}
                                    </div>
                                )}
                            </form>
                            <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                                Schon registriert?{" "}
                                <a href="/login" className="text-blue-500 hover:underline font-semibold">
                                    Jetzt einloggen
                                </a>
                            </div>
                        </div>
                    </div>
                </AnimatedBorder>
            </div>
        </div>
    );
}