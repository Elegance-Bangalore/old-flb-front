import React, { useState } from "react";
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import CampaignTable from "./CampaignTable";
import CampaignModal from "./CampaignModal";
import { Link } from "react-router-dom";

function CampaignMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleAddCampaign = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCampaignSaved = () => {
    setRefreshTable(prev => !prev);
    setIsModalOpen(false);
  };

  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-lg-6">
          <div className="breadcrumb_content">
            <h2 className="breadcrumb_title mt-5 mb-3 pb-3">Campaign Management</h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-5 mb-3 text-end">
            <button className="btn-black me-2" onClick={handleAddCampaign}>
              Add Campaign
            </button>
            {/* <Link to="/campaign">
              <button className="btn-black">Preview</button>
            </Link> */}
          </div>
        </div>
      </div>

      <CampaignTable refreshTrigger={refreshTable} />
      
      <CampaignModal 
        open={isModalOpen} 
        onClose={handleModalClose}
        onSave={handleCampaignSaved}
      />
    </div>
  );
}

export default CampaignMain;
