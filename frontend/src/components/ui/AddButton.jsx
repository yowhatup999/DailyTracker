// src/components/ui/AddButton.jsx
import React from "react";

export default function AddButton({ children, onClick, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition ${className}`}
        >
            {children}
        </button>
    );
}