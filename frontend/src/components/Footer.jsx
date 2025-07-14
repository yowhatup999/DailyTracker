// src/components/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full flex flex-col items-center justify-center z-30 pointer-events-none"
            style={{ pointerEvents: "none" }}
        >
            <div
                className="text-xs text-zinc-400 font-medium select-none text-center"
                style={{ opacity: 0.7, marginBottom: 20 }}
            >
                &copy; 2025 All rights reserved<br />
                <span className="text-[11px] tracking-wide">by yowhatup999</span>
            </div>
        </footer>
    );
}