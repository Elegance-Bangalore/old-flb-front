import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import RecentActivityMain from "@/MainRoles/Admin/Features/ManageAnalytics/RecentActivities/RecentActivityMain";
import React from "react";

function AdminRecentActivityPage() {
  return (
    <NewAdminSidebar>
      <RecentActivityMain />
    </NewAdminSidebar>
  );
}

export default AdminRecentActivityPage;
