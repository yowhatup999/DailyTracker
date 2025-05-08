// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import RootRedirect from './pages/RootRedirect'; // ✅ wichtig

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRedirect />,
    },
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
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
