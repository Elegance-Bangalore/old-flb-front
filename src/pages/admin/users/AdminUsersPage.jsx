import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import UserListPage from '@/MainRoles/Admin/Features/ManageUsers/UserListPage'
import React from 'react'

function AdminUsersPage() {
  return (
    <div>
      <NewAdminSidebar>
        <UserListPage />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminUsersPage