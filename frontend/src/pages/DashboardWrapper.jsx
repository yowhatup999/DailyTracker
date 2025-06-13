// src/pages/DashboardWrapper.jsx
import React from "react";
import DashboardContent from "../components/DashboardContent";
import StatModal from "../components/StatModal";

export default function DashboardWrapper({ dashboard, overrides, onLocalUpdate, refresh }) {
    return (
        <>
            <DashboardContent
                dashboard={dashboard}
                overrides={overrides}
                onLocalUpdate={onLocalUpdate}
            />
            <StatModal
                refreshDashboard={refresh}
                onLocalUpdate={onLocalUpdate}
            />
        </>
    );
}