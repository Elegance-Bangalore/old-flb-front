import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import PropertyAnalyticsMain from "@/MainRoles/Admin/Features/ManageAnalytics/PropertyAnalytics/PropertyAnalyticsMain";
import React from "react";

function AdminPropertyAnalyticsPage() {
  return (
    <NewAdminSidebar>
      <PropertyAnalyticsMain />
    </NewAdminSidebar>
  );
}

export default AdminPropertyAnalyticsPage;
