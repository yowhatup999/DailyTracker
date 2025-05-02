// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("dailytracker_token");
        if (!token) {
            navigate("/login");
        } else {
            setChecked(true);
        }
    }, [navigate]);

    return checked;
}
