// src/components/AccountDropdown.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-pink-500"
];

export default function AccountDropdown() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [colorClass, setColorClass] = useState("");

    // Username oder Email holen, Fallback "A"
    const username =
        localStorage.getItem("dailytracker_username") ||
        localStorage.getItem("dailytracker_email") ||
        "A";

    // Initialen generieren (ersten Buchstaben, 2 max)
    const initials = username
        .split(" ")
        .map((s) => s[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

    useEffect(() => {
        let stored = localStorage.getItem("avatarColor");
        if (!stored) {
            stored = colors[Math.floor(Math.random() * colors.length)];
            localStorage.setItem("avatarColor", stored);
        }
        setColorClass(stored);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile");
        setOpen(false);
    };

    // Klick außerhalb schließt Dropdown
    useEffect(() => {
        if (!open) return;
        const onClick = () => setOpen(false);
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, [open]);

    return (
        <div className="relative z-[999]" onClick={e => e.stopPropagation()}>
            <button
                onClick={() => setOpen((v) => !v)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass} text-white font-bold hover:scale-105 transition`}
                title="Profil"
            >
                {initials}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg py-2 z-[999]">
                    <button
                        onClick={handleProfile}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        Profil anzeigen
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}