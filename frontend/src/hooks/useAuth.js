// src/hooks/useAuth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("dailytracker_token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
}
