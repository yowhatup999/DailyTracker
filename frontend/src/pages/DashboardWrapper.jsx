// src/pages/DashboardWrapper.jsx
import React from "react";
import DashboardContent from "../components/DashboardContent.jsx";
import StatModal from "../components/StatModal.jsx";

export default function DashboardWrapper({ dashboard, overrides, onLocalUpdate, refresh }) {
    return (
        <DashboardContent
            dashboard={dashboard}
            overrides={overrides}
            onLocalUpdate={onLocalUpdate}
        />
    );
}