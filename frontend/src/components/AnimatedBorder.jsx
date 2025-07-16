// src/components/AnimatedBorder.jsx
import React from "react";

export default function AnimatedBorder({ children }) {
    return (
        <div className="relative w-full animate-glow-border rounded-2xl overflow-hidden p-0.5">
            <div className="glow-inner w-full h-full">
                {children}
            </div>
        </div>
    );
}
