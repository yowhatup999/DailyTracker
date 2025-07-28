// src/components/NotificationPopup.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationPopup({ message }) {
    const [show, setShow] = React.useState(false);
    const autoHideRef = React.useRef(null);

    const clearAutoHide = () => {
        if (autoHideRef.current) {
            clearTimeout(autoHideRef.current);
            autoHideRef.current = null;
        }
    };

    const handleMouseDown = () => {
        clearAutoHide();
        setShow(false);
    };

    React.useEffect(() => {
        if (message) {
            setShow(true);

            clearAutoHide();
            autoHideRef.current = setTimeout(() => {
                setShow(false);
            }, 2500);
        }
    }, [message]);

    return (
        <AnimatePresence>
            {message && show && (
                <motion.div
                    key="notification-popup"
                    initial={{ opacity: 0, scale: 0.95, y: -24, backgroundPosition: "0% 50%" }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        backgroundPosition: "100% 50%"
                    }}
                    exit={{ opacity: 0, scale: 0.95, y: -16 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onMouseDown={handleMouseDown}
                    className="fixed inset-x-0 top-6 z-[99999] mx-auto w-fit px-6 py-3 rounded-3xl text-center pointer-events-auto shadow-2xl cursor-pointer"
                    style={{
                        background: "linear-gradient(270deg, rgba(255, 255, 255, 0.6), rgba(240, 240, 255, 0.6), rgba(255, 255, 245, 0.6))",
                        backgroundSize: "400% 400%",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        border: "1px solid rgba(200, 200, 200, 0.4)",
                        color: "rgba(0, 0, 0, 0.8)",
                        fontSize: "1rem",
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                        maxWidth: 480,
                        boxShadow: "0 12px 64px rgba(0,0,0,0.1)",
                        textShadow: "0 0.3px 0.6px rgba(0,0,0,0.04)",
                        lineHeight: "1.4"
                    }}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
