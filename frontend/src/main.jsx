// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles/index.css";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./hooks/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </UserProvider>
    </React.StrictMode>
);