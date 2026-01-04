import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import AdvertisementRequest from "@/MainRoles/Admin/Features/ManageEnqueries/AdvertisementRequest";
import React from "react";

function AdminAdvertisementPage() {
  return (
    <div>
      <NewAdminSidebar>
        <AdvertisementRequest />
      </NewAdminSidebar>
    </div>
  );
}

export default AdminAdvertisementPage;
