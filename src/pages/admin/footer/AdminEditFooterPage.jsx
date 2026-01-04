import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import EditFooter from "@/MainRoles/Admin/Features/ManageFooter/EditFooter";
import React from "react";

function AdminEditFooterPage() {
  return (
    <div>
      <NewAdminSidebar>
        <EditFooter />
      </NewAdminSidebar>
    </div>
  );
}

export default AdminEditFooterPage;
