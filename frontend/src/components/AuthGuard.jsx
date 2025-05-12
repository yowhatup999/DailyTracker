// src/components/AuthGuard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthGuard({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("dailytracker_token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                await axios.get("http://localhost:8080/api/auth/check", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsLoading(false);
            } catch (error) {
                localStorage.removeItem("dailytracker_token");
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    if (isLoading) {
        return <div className="text-center mt-10 text-zinc-500">Authentifizierung läuft...</div>;
    }

    return <>{children}</>;
}
