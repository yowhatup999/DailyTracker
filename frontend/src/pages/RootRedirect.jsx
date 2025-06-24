// src/pages/RootRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RootRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/dashboard");
    }, [navigate]);
    return null;
}