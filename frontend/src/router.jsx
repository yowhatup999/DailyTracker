// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import SidebarLayout from './layouts/SidebarLayout';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import RootRedirect from './pages/RootRedirect';
import AuthGuard from './components/AuthGuard';
import AddEntry from "./pages/AddEntry.jsx";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            // Öffentliche Routen
            { path: '/', element: <RootRedirect /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },

            // Geschützte Routen
            {
                element: (
                    <AuthGuard>
                        <SidebarLayout />
                    </AuthGuard>
                ),
                children: [
                    { path: '/dashboard', element: <Dashboard /> },
                    { path: '/settings', element: <Settings /> },
                    { path: '/profile', element: <Profile /> },
                    { path: '/add-entry', element: <AddEntry /> },
                ],
            },

            { path: '/logout', element: <Logout /> },
        ],
    },
]);

export default router;