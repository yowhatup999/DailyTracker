// src/router.jsx
import React from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Logout from './pages/Logout'; // ✅ NEU

const router = createBrowserRouter([
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboard" replace /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/settings', element: <Settings /> },
            { path: '/profile', element: <Profile /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/logout', element: <Logout /> },
]);

export default router;
