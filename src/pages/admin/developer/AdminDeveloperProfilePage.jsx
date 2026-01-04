import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import DeveloperListPage from '@/MainRoles/Admin/Features/ManageDeveloper/DeveloperListPage'
import React from 'react'

function AdminDeveloperProfilePage() {
  return (
    <div>
      <NewAdminSidebar>
        <DeveloperListPage />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminDeveloperProfilePage