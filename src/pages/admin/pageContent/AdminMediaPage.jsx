import React from "react";
import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import MediaMain from "@/MainRoles/Admin/Features/ManagePageContent/Media/MediaMain";

function AdminMediaPage() {
  return (
    <NewAdminSidebar>
      <MediaMain />
    </NewAdminSidebar>
  );
}

export default AdminMediaPage;
