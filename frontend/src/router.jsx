// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout.jsx';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import Logout from './pages/Logout.jsx';
import RootRedirect from './pages/RootRedirect.jsx';
import RequireAuth from "./features/auth/RequireAuth.jsx";
import AddEntry from "./pages/AddEntry.jsx";
import AuthLayout from './layouts/AuthLayout.jsx';

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