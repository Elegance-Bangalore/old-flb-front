import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import FeatureProperty from '@/MainRoles/Admin/Features/ManageProperty/Feature/FeatureProperty'
import React from 'react'

function AdminFeaturesPropertyPage() {
  return (
    <div>
      <NewAdminSidebar>
        <FeatureProperty />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminFeaturesPropertyPage