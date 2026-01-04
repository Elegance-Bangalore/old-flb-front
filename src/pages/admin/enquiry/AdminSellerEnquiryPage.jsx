import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import Enquiries from '@/MainRoles/Admin/Features/ManageEnqueries/Enquires'
import React from 'react'

function AdminSellerEnquiryPage() {
  return (
    <div>
      <NewAdminSidebar>
        <Enquiries />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminSellerEnquiryPage