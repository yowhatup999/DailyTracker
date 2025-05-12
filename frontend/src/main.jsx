// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/index.css';

import { ModalProvider } from "./context/ModalContext";
import { DashboardProvider } from "./context/DashboardContext"; // ✅ NEU

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ModalProvider>
            <DashboardProvider>
                <RouterProvider router={router} />
            </DashboardProvider>
        </ModalProvider>
    </React.StrictMode>
);
