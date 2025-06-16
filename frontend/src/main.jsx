// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles/index.css";
import AppLayout from "./layouts/AppLayout";

import { ModalProvider } from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ModalProvider>
            <RouterProvider router={router} />
            <AppLayout />
        </ModalProvider>
    </React.StrictMode>
);
