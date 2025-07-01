// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import RootRedirect from './pages/RootRedirect';
import RequireAuth from "./features/auth/RequireAuth";
import AddEntry from "./pages/AddEntry.jsx";
import AuthLayout from './layouts/AuthLayout';

const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <AuthLayout>
                <Login />
            </AuthLayout>
        ),
    },
    {
        path: '/signup',
        element: (
            <AuthLayout>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <RootRedirect /> },
            { path: '/dashboard', element: <Dashboard /> },
            {
                element: <RequireAuth />,
                children: [
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