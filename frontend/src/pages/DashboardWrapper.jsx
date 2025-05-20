// src/pages/DashboardWrapper.jsx
import React, { useRef } from "react";
import DashboardContent from "../components/DashboardContent";
import StatModal from "../components/StatModal";

export default function DashboardWrapper() {
    const dashboardRef = useRef();

    return (
        <>
            <DashboardContent ref={dashboardRef} />
            <StatModal refreshDashboard={() => dashboardRef.current?.refresh()} />
        </>
    );
}