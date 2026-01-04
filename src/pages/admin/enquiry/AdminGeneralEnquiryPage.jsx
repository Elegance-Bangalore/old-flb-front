import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import GeneralEnqueries from '@/MainRoles/Admin/Features/ManageEnqueries/GeneralEnqueries'
import React from 'react'

function AdminGeneralEnquiryPage() {
  return (
    <div>
    <NewAdminSidebar>
        <GeneralEnqueries />
    </NewAdminSidebar>
</div>
  )
}

export default AdminGeneralEnquiryPage