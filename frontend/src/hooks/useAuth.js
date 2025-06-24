// src/hooks/useAuth.js
import { useEffect, useState } from "react";

export default function useAuth() {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("dailytracker_token");
        setIsLoggedIn(!!token);
        setIsReady(true);
    }, []);

    return { isReady, isLoggedIn };
}