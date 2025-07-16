// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import "./styles/index.css";
import { ModalProvider } from "./context/ModalContext.jsx";
import { UserProvider } from "./hooks/UserContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import StatModal from "./components/StatModal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NotificationProvider>
            <UserProvider>
                <ModalProvider>
                    <>
                        <RouterProvider router={router} />
                        <StatModal />
                    </>
                </ModalProvider>
            </UserProvider>
        </NotificationProvider>
    </React.StrictMode>
);