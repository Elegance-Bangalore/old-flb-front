import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import PromotedProperty from '@/MainRoles/Admin/Features/ManageProperty/Promoted/PromotedProperty'
import React from 'react'

function AdminPromotedPropertyPage() {
  return (
    <div>
      <NewAdminSidebar>
        <PromotedProperty />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminPromotedPropertyPage