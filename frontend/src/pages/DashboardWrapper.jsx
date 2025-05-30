// src/pages/DashboardWrapper.jsx
import React, { useRef, useState } from "react";
import DashboardContent from "../components/DashboardContent";
import StatModal from "../components/StatModal";

export default function DashboardWrapper() {
    const dashboardRef = useRef();
    const [overrides, setOverrides] = useState({});

    const handleLocalUpdate = (payload) => {
        setOverrides(prev => ({
            ...prev,
            [`${payload.type}${payload.id ? `-${payload.id}` : ''}`]: payload,
        }));
    };

    return (
        <>
            <DashboardContent
                ref={dashboardRef}
                overrides={overrides}    // <-- NEU!
                onLocalUpdate={handleLocalUpdate}
            />
            <StatModal
                refreshDashboard={() => dashboardRef.current?.refresh()}
                onLocalUpdate={handleLocalUpdate}
            />
        </>
    );
}