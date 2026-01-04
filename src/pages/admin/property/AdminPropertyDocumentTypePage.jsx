import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import PropertyDocumentType from "@/MainRoles/Admin/Features/ManageProperty/DocumentType/PropertyDocumentType";
import React from "react";

function AdminPropertyDocumentTypePage() {
  return (
    <NewAdminSidebar>
      <PropertyDocumentType />
    </NewAdminSidebar>
  );
}

export default AdminPropertyDocumentTypePage;
