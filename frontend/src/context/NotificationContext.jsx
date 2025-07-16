// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [visible, setVisible] = useState(false);

    // 4000ms = 4 Sekunden
    const showNotification = useCallback((message, duration = 4000) => {
        setNotification(message);
        setVisible(true);
        setTimeout(() => setVisible(false), duration);
        setTimeout(() => setNotification(null), duration + 500);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div
                    className={`
                        fixed top-8 left-1/2 -translate-x-1/2 z-[99999]
                        px-7 py-4 rounded-2xl shadow-xl
                        font-medium text-base text-center
                        bg-white/70 dark:bg-zinc-800/70
                        backdrop-blur-lg
                        border border-white/30 dark:border-zinc-700/50
                        transition-all duration-300
                        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                    `}
                    style={{
                        minWidth: 220,
                        maxWidth: 420,
                        boxShadow: "0 8px 40px 0 rgba(0,0,0,0.12)",
                        letterSpacing: ".01em",
                        fontWeight: 500,
                        background: "rgba(255,255,255,0.68)",
                        color: "#1a1a1a",
                        backdropFilter: "blur(10px) saturate(1.12)",
                        WebkitBackdropFilter: "blur(10px) saturate(1.12)",
                        border: "1.5px solid rgba(255,255,255,0.26)",
                        wordBreak: "break-word",
                        textAlign: "center"
                    }}
                >
                    {notification}
                </div>
            )}
        </NotificationContext.Provider>
    );
}