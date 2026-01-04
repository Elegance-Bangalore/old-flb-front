import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import UserAddPage from '@/MainRoles/Admin/Features/ManageUsers/UserAddPage'
import React from 'react'

function AdminAddUserPage() {
    return (
        <div>
            <NewAdminSidebar>
                <UserAddPage />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminAddUserPage