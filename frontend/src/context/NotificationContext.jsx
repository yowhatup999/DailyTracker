// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import NotificationPopup from "../components/NotificationPopup";

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [messageKey, setMessageKey] = useState(0);

    const showNotification = useCallback((message) => {
        setMessageKey(Date.now());
        setNotification(message);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationPopup message={notification} key={messageKey} />
        </NotificationContext.Provider>
    );
}
