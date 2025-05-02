// src/pages/RootRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RootRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("dailytracker_token");
        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return null;
}
