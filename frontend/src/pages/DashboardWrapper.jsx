// src/pages/DashboardWrapper.jsx
import React, { useRef, useState } from "react";
import DashboardContent from "../components/DashboardContent";
import StatModal from "../components/StatModal";

export default function DashboardWrapper({ dashboard, refreshDashboard }) {
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
                dashboard={dashboard}
                overrides={overrides}
                onLocalUpdate={handleLocalUpdate}
            />
            <StatModal
                refreshDashboard={refreshDashboard}
                onLocalUpdate={handleLocalUpdate}
            />
        </>
    );
}