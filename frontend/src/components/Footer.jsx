// src/components/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center justify-center mt-10 mb-2">
            <div className="text-xs text-zinc-400 font-medium select-none text-center" style={{ opacity: 0.7 }}>
                &copy; 2025 All rights reserved<br />
                <span className="text-[11px] tracking-wide">by yowhatup999</span>
            </div>
        </footer>
    );
}