import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import BuyerListPage from '@/MainRoles/Admin/Features/ManageDeveloper/BuyerListPage'
import React from 'react'

function AdminBuyerListPage() {
  return (
    <div>
        <NewAdminSidebar>
            <BuyerListPage />
        </NewAdminSidebar>
    </div>
  )
}

export default AdminBuyerListPage