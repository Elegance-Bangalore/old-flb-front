import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import DeveloperAnalyticsMain from "@/MainRoles/Admin/Features/ManageAnalytics/DeveloperAnalytics/DeveloperAnalyticMain";
import React from "react";

function AdminDeveloperAnalyticsPage() {
  return (
    <NewAdminSidebar>
      <DeveloperAnalyticsMain />
    </NewAdminSidebar>
  );
}

export default AdminDeveloperAnalyticsPage;
