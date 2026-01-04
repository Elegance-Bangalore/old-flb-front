import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import Footer from '@/MainRoles/Admin/Features/ManageFooter/Footer'
import React from 'react'

function AdminFooterPage() {
  return (
    <div>
      <NewAdminSidebar>
        <Footer />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminFooterPage