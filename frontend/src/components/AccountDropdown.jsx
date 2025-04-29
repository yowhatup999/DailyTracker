// src/components/AccountDropdown.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-pink-500"];

export default function AccountDropdown() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [colorClass, setColorClass] = useState("");

    const initials = "A"; // später dynamisch: Benutzername erster Buchstabe

    useEffect(() => {
        let storedColor = localStorage.getItem("avatarColor");
        if (!storedColor) {
            storedColor = colors[Math.floor(Math.random() * colors.length)];
            localStorage.setItem("avatarColor", storedColor);
        }
        setColorClass(storedColor);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile");
        setOpen(false);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setOpen(!open)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass} text-white font-bold hover:scale-105 transition-transform`}
            >
                {initials}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg py-2 z-50">
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
