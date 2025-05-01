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
        <div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark p-4">
            <div className="w-full max-w-sm">
                <AnimatedBorder>
                    <div className="glow-inner p-8 space-y-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight">Registrieren</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-left space-y-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">E-Mail</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@gmail.com"
                                />
                            </div>

                            <div className="text-left space-y-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Passwort</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg font-semibold text-white"
                            >
                                Registrieren
                            </button>

                            {message && (
                                <div className={`mt-4 text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
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
                </AnimatedBorder>
            </div>
        </div>
    );
}
