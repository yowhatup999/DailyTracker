// src/main.jsx
import './styles/output.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
