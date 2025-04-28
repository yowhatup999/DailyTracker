// src/pages/Login.jsx
import React from "react";

import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'admin@admin' && password === 'admin') {
            alert('Login erfolgreich!');
            window.location.href = '/';
        } else {
            alert('Login fehlgeschlagen!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
            <div className="bg-zinc-900/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-sm border border-zinc-700">
                <h1 className="text-3xl font-bold mb-8 text-center">Willkommen</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">E-Mail</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@admin"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">Passwort</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-3 rounded-lg font-semibold"
                    >
                        Einloggen
                    </button>
                </form>
            </div>
        </div>
    );
}